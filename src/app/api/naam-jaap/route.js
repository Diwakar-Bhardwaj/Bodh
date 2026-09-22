

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route"; 
// import pool from "@/lib/db";

// export async function GET() {
//   try {
//     // 1. Authenticate the user session
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // 2. Fetch tracking metrics using a clean subquery against the session email
//     // ✅ EXACT MATCH: Using 'mantra_name' from your DB schema
//     const [rows] = await pool.query(
//       `SELECT count, mala_count, japs_today, japs_week, japs_month, mantra_name
//        FROM user_jaap_stats 
//        WHERE user_id = (SELECT id FROM users WHERE email = ? LIMIT 1) 
//        LIMIT 1`,
//       [session.user.email]
//     );

//     // Fallback block if the user doesn't have a record entry row yet
//     if (rows.length === 0) {
//       return NextResponse.json({
//         success: true,
//         data: { count: 0, malaCount: 0, today: 0, week: 0, month: 0, jaap_naam: "राम" }
//       });
//     }

//     const stats = rows[0];
//     return NextResponse.json({
//       success: true,
//       data: {
//         count: stats.count,
//         malaCount: stats.mala_count,
//         today: stats.japs_today,
//         week: stats.japs_week,
//         month: stats.japs_month,
//         jaap_naam: stats.mantra_name || "राम" // Mapping mantra_name field property over to the expected frontend framework key string
//       }
//     });
//   } catch (error) {
//     console.error("Failed fetching Naam Jaap metrics:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     // 1. Authenticate the user session
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Accepts 'jaap_naam' payload transmitted directly from client interactions frame
//     const { incrementBy, newMalaCount, jaap_naam } = await req.json();
//     const inc = incrementBy !== undefined ? incrementBy : 1; 

//     // 2. Get the current user's ID from their session email
//     const [userRow] = await pool.query(
//       "SELECT id FROM users WHERE email = ? LIMIT 1",
//       [session.user.email]
//     );

//     if (userRow.length === 0) {
//       return NextResponse.json({ message: "User record not found" }, { status: 404 });
//     }
//     const userId = userRow[0].id;

//     // 3. Determine target count and mantra tracking states
//     // ✅ EXACT MATCH: Reading 'mantra_name' from DB schema
//     const [currentStats] = await pool.query(
//       "SELECT count, mantra_name FROM user_jaap_stats WHERE user_id = ?",
//       [userId]
//     );
    
//     let targetCount = inc;
//     let targetMantra = jaap_naam || 'राम';
    
//     if (currentStats.length > 0) {
//       targetCount = currentStats[0].count + inc;
//       if (targetCount > 108) targetCount = 0; 
//       if (!jaap_naam) targetMantra = currentStats[0].mantra_name || 'राम';
//     }

//     // 4. Perform the Upsert operation safely
//     // ✅ EXACT MATCH: Using 'mantra_name' column name inside the query syntax
//     const query = `
//       INSERT INTO user_jaap_stats (user_id, count, mala_count, japs_today, japs_week, japs_month, mantra_name)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//       ON DUPLICATE KEY UPDATE
//         count = VALUES(count),
//         mala_count = VALUES(mala_count),
//         japs_today = japs_today + ?,
//         japs_week = japs_week + ?,
//         japs_month = japs_month + ?,
//         mantra_name = VALUES(mantra_name)
//     `;

//     // 10 variables matching your 7 INSERT and 3 UPDATE target placeholders sequentially
//     await pool.query(query, [
//       userId,
//       targetCount,
//       newMalaCount,
//       inc,          // Initial japs_today for INSERT
//       inc,          // Initial japs_week for INSERT
//       inc,          // Initial japs_month for INSERT
//       targetMantra, // Initial mantra_name for INSERT
//       inc,          // For japs_today update math logic addition
//       inc,          // For japs_week update math logic addition
//       inc           // For japs_month update math logic addition
//     ]);

//     // 5. Query back the newly updated aggregates to update the UI instantly
//     // ✅ EXACT MATCH: Reading fields precisely as per structural specification map
//     const [updatedRows] = await pool.query(
//       "SELECT count, mala_count, japs_today, japs_week, japs_month, mantra_name FROM user_jaap_stats WHERE user_id = ?",
//       [userId]
//     );

//     const stats = updatedRows[0];
//     return NextResponse.json({
//       success: true,
//       data: {
//         count: stats.count,
//         malaCount: stats.mala_count,
//         today: stats.japs_today,
//         week: stats.japs_week,
//         month: stats.japs_month,
//         jaap_naam: stats.mantra_name || "राम" // Return it safely as jaap_naam to satisfy your layout dependencies cleanly
//       }
//     });
//   } catch (error) {
//     console.error("Failed updating Naam Jaap aggregates:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; 
import pool from "@/lib/db";

let hasMantraNameColumn;

async function supportsMantraName() {
  if (hasMantraNameColumn !== undefined) return hasMantraNameColumn;

  const [columns] = await pool.query("SHOW COLUMNS FROM user_jaap_stats LIKE 'mantra_name'");
  hasMantraNameColumn = columns.length > 0;
  return hasMantraNameColumn;
}

export async function GET() {
  try {
    // 1. Authenticate the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const canStoreMantra = await supportsMantraName();

    // 2. Fetch tracking metrics along with date boundary checks directly in MySQL
    const [rows] = await pool.query(
      `SELECT count, mala_count, japs_today, japs_week, japs_month${canStoreMantra ? ", mantra_name" : ""},
        (DATE(updated_at) = CURDATE()) AS is_today,
        (YEARWEEK(updated_at, 1) = YEARWEEK(CURDATE(), 1)) AS is_this_week,
        (YEAR(updated_at) = YEAR(CURDATE()) AND MONTH(updated_at) = MONTH(CURDATE())) AS is_this_month
       FROM user_jaap_stats 
       WHERE user_id = (SELECT id FROM users WHERE email = ? LIMIT 1) 
       LIMIT 1`,
      [session.user.email]
    );

    // Fallback block if the user doesn't have a record entry row yet
    if (rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: { count: 0, malaCount: 0, today: 0, week: 0, month: 0, jaap_naam: "राम" }
      });
    }

    const stats = rows[0];
    
    // Mechanical Reset: If the date window isn't matching today/this week/this month, return 0 to the client
    return NextResponse.json({
      success: true,
      data: {
        count: stats.is_today ? stats.count : 0, // ✅ GET query me bhi daily reset safety toggle
        malaCount: stats.is_today ? stats.mala_count : 0, // ✅ Naya din hote hi fetch par bhi 0 dikhega
        today: stats.is_today ? stats.japs_today : 0,
        week: stats.is_this_week ? stats.japs_week : 0,
        month: stats.is_this_month ? stats.japs_month : 0,
        jaap_naam: canStoreMantra ? (stats.mantra_name || "राम") : "राम"
      }
    });
  } catch (error) {
    console.error("Failed fetching Naam Jaap metrics:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // 1. Authenticate the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { incrementBy, newMalaCount, jaap_naam } = await req.json();
    const inc = incrementBy !== undefined ? incrementBy : 1; 

    // 2. Get the current user's ID from their session email
    const [userRow] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [session.user.email]
    );

    if (userRow.length === 0) {
      return NextResponse.json({ message: "User record not found" }, { status: 404 });
    }
    const userId = userRow[0].id;
    const canStoreMantra = await supportsMantraName();

    // 3. Determine target count, mantra tracking states, and evaluate time boundaries
    const [currentStats] = await pool.query(
      `SELECT count, mala_count${canStoreMantra ? ", mantra_name" : ""}, japs_today, japs_week, japs_month,
        (DATE(updated_at) = CURDATE()) AS is_today,
        (YEARWEEK(updated_at, 1) = YEARWEEK(CURDATE(), 1)) AS is_this_week,
        (YEAR(updated_at) = YEAR(CURDATE()) AND MONTH(updated_at) = MONTH(CURDATE())) AS is_this_month
       FROM user_jaap_stats WHERE user_id = ?`,
      [userId]
    );
    
    let targetCount = inc;
    let targetMalaCount = newMalaCount !== undefined ? newMalaCount : 0;
    let targetMantra = jaap_naam || 'राम';
    let todayCount = inc;
    let weekCount = inc;
    let monthCount = inc;
    
    if (currentStats.length > 0) {
      const activeRow = currentStats[0];
      
      todayCount = activeRow.is_today ? activeRow.japs_today + inc : inc;
      weekCount = activeRow.is_this_week ? activeRow.japs_week + inc : inc;
      monthCount = activeRow.is_this_month ? activeRow.japs_month + inc : inc;
      
      // 🌟 DAILY RESET CONDITION FOR COUNT & MALA_COUNT
      if (!activeRow.is_today) {
        targetCount = inc;         // Naya din hone par counter baseline 1 se start hoga
        targetMalaCount = 0;       // Naya din hone par completed malas wipe hokar 0 ho jayengi
      } else {
        targetCount = activeRow.count + inc;
        targetMalaCount = newMalaCount !== undefined ? newMalaCount : activeRow.mala_count;
        if (targetCount > 108) targetCount = 0; 
      }
      if (!jaap_naam && canStoreMantra) targetMantra = activeRow.mantra_name || 'राम';
    }

    // 4. Perform the Upsert operation accurately
    const query = canStoreMantra
      ? `
        INSERT INTO user_jaap_stats (user_id, count, mala_count, japs_today, japs_week, japs_month, mantra_name)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          count = VALUES(count),
          mala_count = VALUES(mala_count),
          japs_today = VALUES(japs_today),
          japs_week = VALUES(japs_week),
          japs_month = VALUES(japs_month),
          mantra_name = VALUES(mantra_name),
          updated_at = CURRENT_TIMESTAMP
      `
      : `
        INSERT INTO user_jaap_stats (user_id, count, mala_count, japs_today, japs_week, japs_month)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          count = VALUES(count),
          mala_count = VALUES(mala_count),
          japs_today = VALUES(japs_today),
          japs_week = VALUES(japs_week),
          japs_month = VALUES(japs_month),
          updated_at = CURRENT_TIMESTAMP
      `;

    const queryValues = [userId, targetCount, targetMalaCount, todayCount, weekCount, monthCount];
    if (canStoreMantra) queryValues.push(targetMantra);
    await pool.query(query, queryValues);

    // 5. Query back the newly updated aggregates to update the UI instantly
    const [updatedRows] = await pool.query(
      `SELECT count, mala_count, japs_today, japs_week, japs_month${canStoreMantra ? ", mantra_name" : ""}
       FROM user_jaap_stats WHERE user_id = ?`,
      [userId]
    );

    const stats = updatedRows[0];
    return NextResponse.json({
      success: true,
      data: {
        count: stats.count,
        malaCount: stats.mala_count,
        today: stats.japs_today,
        week: stats.japs_week,
        month: stats.japs_month,
        jaap_naam: canStoreMantra ? (stats.mantra_name || "राम") : "राम"
      }
    });
  } catch (error) {
    console.error("Failed updating Naam Jaap aggregates:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}