import pool from "@/lib/db";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
        // 1. parsing incoming JSON body
        const { name, email, subject, message } = await req.json();

        //2. validate fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 },
            );
        }

        //3. validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        //4. connect to db
        const sql = `insert into contact (name, email, subject, message) values (?, ?, ?,?)`;

        await pool.query(sql, [name, email, subject, message]);

        // 5 return success res
        return NextResponse.json(
            { success: true, message: "Message sent successfully"},
            { status: 201 },
        );

    } catch (error) {
        console.log("Error in contact api", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong on our end."},
            { status: 500},
        )
    }
}