import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";

export async function GET() {

  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [users] = await pool.query(
      "SELECT name, email, username, image FROM users WHERE email = ?",
      [session.user.email]
    );

    return NextResponse.json(users[0]);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}