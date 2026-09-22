import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const [user] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (user.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users(name,email,password) VALUES(?,?,?)",
      [name, email, hashedPassword]
    );

    return NextResponse.json(
      { message: "Register success" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
