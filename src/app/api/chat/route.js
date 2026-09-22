
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Path double check kar lijiye
import pool from "@/lib/db"; 
import { GoogleGenAI } from "@google/genai";

const PLAN_LIMITS = {
  free: 2,
  "plan_t6dljo91m2gldp": 10,  // Believa Pro (Entry 1)
  // "plan_t7opaapnq7na3j": 10,  // Believa Pro (Entry 2)
  "plan_t6dnhcflrpnshx": 15,  // Believa Family
  "plan_t6dotyne6wuizf": 20,  // Believa Plus
};

export async function POST(req) {
  try {
    // 1. Authenticate user context directly from NextAuth Server Session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    // Parse incoming chat messages array
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // 2. Fetch the numeric User ID from database using session email
    const [users] = await pool.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1", 
      [session.user.email]
    );

    if (users.length === 0) {
      return NextResponse.json({ error: "User profile not found in database." }, { status: 404 });
    }
    
    const userId = users[0].id; // Secured raw user numeric ID

    // 3. Check subscription tier using the active plan_id row
    let planIdKey = "free"; 

    try {
      const [rows] = await pool.execute(`
        SELECT s.plan_id 
        FROM user_subscriptions s
        WHERE s.user_id = ? AND s.status = 'active'
        ORDER BY s.created_at DESC 
        LIMIT 1
      `, [userId]);

      if (rows.length > 0 && rows[0].plan_id) {
        planIdKey = rows[0].plan_id.toLowerCase(); 
      }
    } catch (dbError) {
      console.error("Database subscription lookup failed. Falling back to free tier:", dbError);
    }

    // 4. 🌟 VALIDATE LIMIT WITH STRICT DB-SIDE AUTO-RESET (Fixed Timezone Loop)
    const [usageRows] = await pool.execute(
      `SELECT messages_sent, 
              IF(DATE(updated_at) = CURRENT_DATE(), 1, 0) as is_today 
       FROM user_chat_usage 
       WHERE user_id = ?`,
      [userId]
    );
    
    let actualMessagesSent = 0;

    if (usageRows.length > 0) {
      // Direct Database validation rule checking
      if (usageRows[0].is_today === 1) {
        actualMessagesSent = usageRows[0].messages_sent;
      } else {
        actualMessagesSent = 0; // Previous date found, automatic local reset override
      }
    }

    const maxAllowedMessages = PLAN_LIMITS[planIdKey] || PLAN_LIMITS.free; 

    // Guardrail validation check: Blocks user immediately if limit reached
    if (actualMessagesSent >= maxAllowedMessages) {
      return NextResponse.json(
        { error: `Daily message limit exceeded for your tier. It will reset tomorrow.` },
        { status: 429 }
      );
    }

    // Format chat messages for Gemini
    const recentChat = messages.slice(-5); 
    const systemPrompt = "You are a wise spiritual guide. Only answer spiritual questions. Discuss Bhagavad Gita, Ramayan, meditation, inner peace, and mindfulness. Politely refuse unrelated questions. Keep responses under 300 words.";
    const formattedContents = recentChat.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.text || msg.content || "" }],
    }));

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured. Add GEMINI_API_KEY to .env.local and restart the server." },
        { status: 503 }
      );
    }

    const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    let result;

    try {
      result = await ai.models.generateContent({
        model,
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          maxOutputTokens: 2000,
        },
      });
    } catch (error) {
      const providerMessage = error?.message || "The AI service could not process your request right now.";
      console.error("Gemini request failed:", providerMessage);

      if (/api key|permission|unauthorized|forbidden|authentication/i.test(providerMessage)) {
        return NextResponse.json(
          { error: "Gemini rejected the API key. Create a fresh key in Google AI Studio, enable the Generative Language API, update GEMINI_API_KEY, and restart the server." },
          { status: 403 }
        );
      }

      if (/not found|model/i.test(providerMessage)) {
        return NextResponse.json(
          { error: `Gemini model "${model}" is unavailable for this project. Set GEMINI_MODEL to a model enabled for your account.` },
          { status: 400 }
        );
      }

      return NextResponse.json({ error: providerMessage }, { status: 502 });
    }

    const aiReplyText = result?.text?.trim();

    if (!aiReplyText) {
      console.error("Gemini response did not contain assistant content:", result);
      return NextResponse.json(
        { error: "The AI service returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    // Guardrail validation for token usage limit
    const totalTokens = result?.usageMetadata?.totalTokenCount || 0;
    if (totalTokens > 3000) {
      return NextResponse.json(
        { error: "Conversation token limit exceeded. Please shorten your query." },
        { status: 429 }
      );
    }

    // 5. 🌟 INCREMENT ON SUCCESS WITH EXPLICIT TIMESTAMP RE-WRITE
    if (result) {
      await pool.execute(`
        INSERT INTO user_chat_usage (user_id, messages_sent, updated_at)
        VALUES (?, 1, NOW())
        ON DUPLICATE KEY UPDATE 
          messages_sent = IF(DATE(updated_at) < CURRENT_DATE(), 1, messages_sent + 1),
          updated_at = NOW(); -- Forced updates trigger accurate timestamp reset intervals
      `, [userId]);
    }

    return NextResponse.json({
      choices: [{ message: { role: "assistant", content: aiReplyText } }],
      usage: { total_tokens: totalTokens },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}