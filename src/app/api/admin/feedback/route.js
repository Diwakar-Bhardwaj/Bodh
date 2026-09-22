import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        // first select feedback from db
        const sql = `select id, name, email, experience, comment, created_at from feedback order by created_at DESC`;

        // pool query
        const [feedback] = await pool.query(sql);

        // return res to frontend;
        return NextResponse.json(
            { success: true, data: feedback},
            { status: 200 }
        );

    } catch (error) {
        console.log("Error in feedback fetching api : ", error);
        return NextResponse.json(
            { success: false, message: "Failed to load message from database"},
            { status: 500}
        );
    }
}