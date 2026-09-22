import { NextResponse } from "next/server";
import pool from "@/lib/db";

// 1. FETCH ALL SAVED CHAPTERS FOR A USER
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || 1; // Replace with your actual auth session ID

    const [savedItems] = await pool.query(`
      SELECT 
        sc.chapter_id,
        c.chapter_number,
        c.title AS chapter_title,
        c.book_id,
        b.title AS book_title
      FROM saved_chapters sc
      JOIN chapters c ON sc.chapter_id = c.id
      JOIN books b ON c.book_id = b.id
      WHERE sc.user_id = ?
      ORDER BY sc.saved_at DESC
    `, [userId]);

    return NextResponse.json({ savedChapters: savedItems });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 2. TOGGLE SAVE / ADD BOOKMARK
export async function POST(req) {
  try {
    const { userId, chapterId } = await req.json();
    
    await pool.query(
      "INSERT IGNORE INTO saved_chapters (user_id, chapter_id) VALUES (?, ?)",
      [userId, chapterId]
    );
    
    return NextResponse.json({ success: true, message: "Chapter bookmarked!" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 3. REMOVE BOOKMARK
export async function DELETE(req) {
  try {
    const { userId, chapterId } = await req.json();
    
    await pool.query(
      "DELETE FROM saved_chapters WHERE user_id = ? AND chapter_id = ?",
      [userId, chapterId]
    );
    
    return NextResponse.json({ success: true, message: "Bookmark removed!" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}