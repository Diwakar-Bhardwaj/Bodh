
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/route";

let hasStreakHistoryColumn;

async function supportsStreakHistory() {
  if (hasStreakHistoryColumn !== undefined) return hasStreakHistoryColumn;

  const [columns] = await pool.query("SHOW COLUMNS FROM users LIKE 'streak_history'");
  hasStreakHistoryColumn = columns.length > 0;
  return hasStreakHistoryColumn;
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    const canStoreHistory = await supportsStreakHistory();

    // Older databases may not have the optional weekly history column yet.
    const [rows] = await pool.query(
      `SELECT streak_count, last_visit${canStoreHistory ? ", streak_history" : ""}
       FROM users WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let { streak_count, last_visit, streak_history = [] } = rows[0];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Determine current weekday index (1 = Monday, 7 = Sunday)
    let currentDayIdx = today.getDay(); 
    if (currentDayIdx === 0) currentDayIdx = 7;

    let newStreak = streak_count || 0;
    let history = [];

    // Parse existing history safely
    try {
      history = typeof streak_history === "string" ? JSON.parse(streak_history) : (streak_history || []);
    } catch (e) {
      history = [];
    }

    if (!last_visit) {
      newStreak = 1;
      history = [currentDayIdx]; // Start fresh history array
    } else {
      const lastVisitDate = new Date(last_visit);
      lastVisitDate.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - lastVisitDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Continuous streak
        newStreak += 1;
        if (!history.includes(currentDayIdx)) {
          history.push(currentDayIdx);
        }
      } else if (diffDays > 1) {
        // Broken streak -> Reset completely
        newStreak = 1;
        history = [currentDayIdx]; // Flush old days, keep only today
      } else if (diffDays === 0) {
        // Same-day double-visit: preserve existing history log
        if (!history.includes(currentDayIdx)) {
          history.push(currentDayIdx);
        }
      }
    }

    // Weekly cycle reset: If it's Monday, clear out previous weeks' residue history markers
    if (currentDayIdx === 1) {
      history = [1];
    }

    // Save the core streak on every schema; persist weekly history when supported.
    if (canStoreHistory) {
      await pool.query(
        "UPDATE users SET streak_count = ?, last_visit = NOW(), streak_history = ? WHERE email = ?",
        [newStreak, JSON.stringify(history), email]
      );
    } else {
      await pool.query(
        "UPDATE users SET streak_count = ?, last_visit = NOW() WHERE email = ?",
        [newStreak, email]
      );
    }

    return NextResponse.json({
      success: true,
      streakCount: newStreak,
      weekHistory: history, // Return the explicit array of active day indexes
      message: "Streak tracked successfully",
    });

  } catch (error) {
    console.error("Streak Tracking Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}