import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import pool from "@/lib/db";

export async function DELETE() {

  try {

    const session = await getServerSession(authOptions);

    if (!session) {

      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await pool.query(
      "DELETE FROM users WHERE email = ?",
      [session.user.email]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}