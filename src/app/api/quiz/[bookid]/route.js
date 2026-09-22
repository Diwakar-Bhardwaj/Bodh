import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req, { params }) {
  try {
    // 1. Await params if using modern Next.js versions
    const resolvedParams = await params; 
    
    // 2. Match the exact casing of your folder name [bookid]
    const bookId = resolvedParams.bookid;

    if (!bookId || bookId === "undefined") {
      return NextResponse.json({ success: false, error: "Missing or invalid Book ID" }, { status: 400 });
    }

    // Joins books and questions matching indices
    const [rows] = await pool.query(
      `SELECT q.*, b.title as book_title 
       FROM quiz_questions q
       JOIN books b ON q.book_id = b.id
       WHERE q.book_id = ?`,
      [bookId]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Quiz API Fetch Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}