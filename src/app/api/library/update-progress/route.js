import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || null;

    if (!userEmail) {
      return NextResponse.json({ message: "Unauthorized Entry Blocked" }, { status: 401 });
    }

    const { bookId, chapterId } = await req.json();
    if (!bookId || !chapterId) {
      return NextResponse.json({ message: "Missing required identifier keys" }, { status: 400 });
    }

    // 1. Convert user email reference into structural integer identifier
    const [users] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [userEmail]);
    if (users.length === 0) return NextResponse.json({ message: "No database user entry matched" }, { status: 404 });
    const userId = users[0].id;

    // 2. INSERT IGNORE operation ensures safe writing logic layout execution skips duplicates
    const query = `
      INSERT IGNORE INTO user_chapter_progress (user_id, book_id, chapter_id)
      VALUES (?, ?, ?);
    `;
    
    await pool.query(query, [userId, bookId, chapterId]);
    return NextResponse.json({ success: true, message: "Progress recorded dynamically." });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}