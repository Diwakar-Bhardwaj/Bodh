import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    
    try {
        // data fetching from db
        const sql = `select id, name, email, rating, review_text, created_at from believa_ratings order by created_at Desc`;

        // pool query
        const [rating] = await pool.query(sql);

        // return res to frontend
        return NextResponse.json(
            { success: true, data: rating},
            { status: 200 }
        );

    } catch (error) {
        console.log("Error in rating api : ", error);
        return NextResponse.json(
            { message: "Failed to load rating from database"},
            { status: 500 }
        );
    }
}