// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const bookIdRaw = searchParams.get("bookId");
//     const chapterIdRaw = searchParams.get("chapterId"); 

//     // 1. If looking up an exact specific Chapter's data row text
//     if (chapterIdRaw) {
//       const chapterId = parseInt(chapterIdRaw, 10);
//       const [chapters] = await pool.query("SELECT * FROM chapters WHERE id = ?", [chapterId]);
      
//       if (chapters.length === 0) {
//         return NextResponse.json({ message: "Chapter row completely empty" }, { status: 404 });
//       }
//       return NextResponse.json({ chapter: chapters[0] });
//     }

//     // 2. If looking up the compilation of chapters inside a targeted book
//     if (bookIdRaw) {
//       const bookId = parseInt(bookIdRaw, 10);
//       const [chapters] = await pool.query(
//         "SELECT id, chapter_number, title FROM chapters WHERE book_id = ? ORDER BY chapter_number ASC",
//         [bookId]
//       );
//       return NextResponse.json({ chapters });
//     }

//     // 3. Fallback default lookup to list all general Books with dynamic chapter & question counts
//     const [books] = await pool.query(`
//       SELECT 
//         b.id,
//         b.title,
//         b.image_url,
//         b.description,
//         COUNT(DISTINCT c.id) AS total_chapters,
//         COALESCE(q.quiz_count, 0) AS total_questions
//       FROM books b
//       LEFT JOIN chapters c ON b.id = c.book_id
//       LEFT JOIN (
//         SELECT book_id, COUNT(*) AS quiz_count 
//         FROM quiz_questions 
//         GROUP BY book_id
//       ) q ON b.id = q.book_id
//       GROUP BY b.id
//       ORDER BY b.id ASC
//     `);
    
//     return NextResponse.json({ books });

//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookIdRaw = searchParams.get("bookId");
    const chapterIdRaw = searchParams.get("chapterId"); 

    if (chapterIdRaw) {
      const chapterId = parseInt(chapterIdRaw, 10);
      const [chapters] = await pool.query("SELECT * FROM chapters WHERE id = ?", [chapterId]);
      if (chapters.length === 0) {
        return NextResponse.json({ message: "Chapter empty" }, { status: 404 });
      }
      return NextResponse.json({ chapter: chapters[0] });
    }

    if (bookIdRaw) {
      const bookId = parseInt(bookIdRaw, 10);
      const [chapters] = await pool.query(
        "SELECT id, chapter_number, title FROM chapters WHERE book_id = ? ORDER BY chapter_number ASC",
        [bookId]
      );
      return NextResponse.json({ chapters });
    }

    // Authenticate user session safely
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || null;

    // Fetch books combined with unique chapter counts using standard layout grouping
    const [books] = await pool.query(`
      SELECT 
        b.id,
        b.title,
        b.image_url,
        b.description,
        COUNT(DISTINCT c.id) AS total_chapters,
        COALESCE(q.quiz_count, 0) AS total_questions,
        COUNT(DISTINCT p.chapter_id) AS chapters_read -- ✅ Live unique database calculation counts
      FROM books b
      LEFT JOIN chapters c ON b.id = c.book_id
      LEFT JOIN (
        SELECT book_id, COUNT(*) AS quiz_count 
        FROM quiz_questions 
        GROUP BY book_id
      ) q ON b.id = q.book_id
      LEFT JOIN user_chapter_progress p ON b.id = p.book_id AND p.user_id = (
        SELECT id FROM users WHERE email = ? LIMIT 1
      )
      GROUP BY b.id -- ✅ Fixed: Grouped purely by book ID to block strict DB errors
      ORDER BY b.id ASC
    `, [userEmail || ""]);
    
    return NextResponse.json({ books });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}