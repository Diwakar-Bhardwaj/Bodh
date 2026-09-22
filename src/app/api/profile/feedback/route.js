import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import pool from "@/lib/db";


export async function POST(req) {

    try {
        //1. parsing incoming json body from frontend
        const { experience, comment } = await req.json();

        //2. validate fields
        if (!experience) {
            return NextResponse.json(
                { success: false, message: "Select your experience" },
                { status: 400 },
            );
        }

        // 3. fetch user data
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse(
                { success: false, message: "Unauthorized. Please log in first." },
                { status: 401 },
            );
        }

        const { name, email } = session.user;

        // 💡 FIXED: Maps frontend snake_case keys to your exact Database ENUM values
        const enumMapping = {
            very_bad: "Very Bad",
            bad: "Bad",
            okay: "Okay",
            good: "Good",
            excellent: "Excellent"
        };


        // Grab the database-friendly string. Fallback to raw value if it already matches.
        const dbExperienceValue = enumMapping[experience] || experience;

        // 3. connect to db;
        const sql = `insert into feedback (name, email, experience, comment) VALUES(?, ?, ?, ?)`;

        const values = [name, email, dbExperienceValue, comment || null];

        await pool.query(sql, values);

        return NextResponse.json(
            { success: true, message: "Feedback submitted successfully! Thank you." },
            { status: 201 },
        );
    } catch (error) {
        console.log("Error feedback api : ", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error. Processing failed." },
            { status: 500 },
        );
    }
}