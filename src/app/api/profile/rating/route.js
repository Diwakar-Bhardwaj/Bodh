import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import pool from "@/lib/db";


export async function POST(req) {
    try {
        // get user data from login
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Please log in first." },
                { status: 401 }
            );
        }

        const { name, email } = session.user;

        // paring from frontend
        const { rating, reviewText } = await req.json();
        // validate fields
        if (!rating || rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, message: "Please provide a valid rating between 1 and 5 stars." },
                { status: 400 }
            );
        }

        // save to mysql 
        const sql = `insert into believa_ratings (name, email, rating , review_text) values (?, ?, ?, ?)`

        const value = [name, email, rating, reviewText || null];

        await pool.query(sql, value);

        return NextResponse.json(
            { success: true, message: `Thank you for rating us ${rating} stars!` },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error in rating api : ", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error. Submission failed."},
            { status: 500 }
        );
    }


}