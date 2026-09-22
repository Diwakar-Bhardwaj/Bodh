import pool from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET() {
    
    try {
        // first select message from db
        const sql = `select id, name, email, subject, message, created_at from contact order by created_at DESC`;

        // pool.query
        const [message] = await pool.query(sql);

        // return message to frontend
        return NextResponse.json(
            { success: true, data: message},
            { status: 200 }
        );

    } catch (error) {
        console.log("Error in messaging fetching api", error);
        return NextResponse(
            { success: false, message: "Failed to load message from database."}, 
            { status: 500 },
        );
    }
}