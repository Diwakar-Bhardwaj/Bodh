

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import pool from "@/lib/db";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, username, image } = body;

    // ✅ FIXED: Check if username exists, but exclude the current logged-in user
    if (username) {
      const [existingUser] = await pool.query(
        "SELECT id FROM users WHERE username = ? AND email != ?",
        [username, session.user.email]
      );

      if (existingUser.length > 0) {
        return NextResponse.json(
          { success: false, message: "Username already taken. Please try another." },
          { status: 400 }
        );
      }
    }

    // UPDATE USER USING SESSION EMAIL
    await pool.query(
      `UPDATE users 
       SET name = ?, email = ?, username = ?, image = ? 
       WHERE email = ?`,
      [
        name,
        email,
        username || null,
        image || null,
        session.user.email,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });

  } catch (error) {
    console.log("Update Profile Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}