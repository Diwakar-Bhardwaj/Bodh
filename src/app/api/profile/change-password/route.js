import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";


export async function PUT(req) {

    try {
        
        // GET session

        const session = await getServerSession(authOptions);

        if(!session) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // GET BODY
        const body = await req.json();

        const {
            currentPassword,
            newPassword,
        } = body;

        //find user
        const [users] = await pool.query(
            "select * from users where email = ?",
            [session.user.email]
        );

        if(users.length === 0) {

            return NextResponse.json(
                { message: "User not found" }, 
                { status: 404 }
            );
        }

        const user = users[0];

        if(!user.password) {

            return NextResponse.json(
                {
                    message: "Google/Apple accounts cannot change password",
                },
                { status: 400 }
            );
        }

        //check old password
        const isMatch = await bcrypt.compare(
            currentPassword, 
            user.password
        );

        if(!isMatch) {

            return NextResponse.json(
                { message: "Current password incorrect" },
                {status: 404}
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // update password
        await pool.query(
            "update users set password = ? where email = ?",
            [
                hashedPassword,
                session.user.email,
            ]
        );

        return NextResponse.json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        
        console.log("Error in change password : ", error);

        return NextResponse.json(
            { message: "Server Error" }, 
            { status: 500 }
        );
        
    }
} 