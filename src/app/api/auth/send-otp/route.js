// app/api/auth/send-otp/route.js

import { NextResponse } from "next/server";
import pool from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expire = Date.now() + 5 * 60 * 1000;

    await pool.query(
      `UPDATE users 
       SET otp = ?, otp_expire = ?
       WHERE email = ?`,
      [otp, expire, email]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
<div style="font-family:Arial;padding:20px">
  <h2>Email Verification</h2>

  <p>Your OTP code is:</p>

  <div style="
    font-size:32px;
    font-weight:bold;
    letter-spacing:5px;
    color:#2563eb;
    margin:20px 0;
  ">
    ${otp}
  </div>

  <p>This code expires in 5 minutes.</p>

  <hr />

  <small>
    If you did not request this email, ignore it.
  </small>
</div>
`
    });

    return NextResponse.json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}