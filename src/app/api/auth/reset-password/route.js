// app/api/auth/reset-password/route.js

import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {

  try {

    const { email, password } =
      await req.json();

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await pool.query(
      `
      UPDATE users
      SET password = ?,
      otp = NULL,
      otp_expire = NULL
      WHERE email = ?
      `,
      [hashedPassword, email]
    );

    return NextResponse.json({
      message:
        "Password updated successfully",
    });

  } catch (error) {

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}