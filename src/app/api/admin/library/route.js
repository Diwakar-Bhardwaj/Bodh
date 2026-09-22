import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, title, slug, imageUrl, description, bookId, chapterNumber, content } = body;

    if (type === "book") {
      if (!title || !slug) return NextResponse.json({ message: "Missing title or slug" }, { status: 400 });
      await pool.query(
        "INSERT INTO books (title, slug, image_url, description) VALUES (?, ?, ?, ?)",
        [title, slug, imageUrl || null, description || null]
      );
      return NextResponse.json({ success: true, message: "Book created!" });
    }

    if (type === "chapter") {
      if (!bookId || !chapterNumber || !title || !slug) {
        return NextResponse.json({ message: "Missing chapter fields" }, { status: 400 });
      }
      await pool.query(
        "INSERT INTO chapters (book_id, chapter_number, title, slug, content) VALUES (?, ?, ?, ?, ?)",
        [bookId, chapterNumber, title, slug, content]
      );
      return NextResponse.json({ success: true, message: "Chapter created!" });
    }

    return NextResponse.json({ message: "Invalid operation type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}