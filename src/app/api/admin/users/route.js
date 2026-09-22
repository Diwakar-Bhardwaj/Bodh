
// src/app/api/admin/users/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; 
import pool from "@/lib/db";

export async function GET(req) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session || session.user?.role !== "ADMIN") {
    //   return NextResponse.json(
    //     { success: false, message: "Access Denied: Administrative Clearance Required." },
    //     { status: 403 }
    //   );
    // }

    const { searchParams } = new URL(req.url);
    const searchFilter = searchParams.get("query") || "";

    let query = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.created_at,
        us.id AS subscription_id,
        us.status AS subscription_status,
        us.current_end,
        sp.name AS plan_name,
        COALESCE(SUM(spl.amount), 0) AS total_spent
      FROM users u
      LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
      LEFT JOIN subscription_plans sp ON us.plan_id = sp.id
      LEFT JOIN subscription_payments_log spl ON us.id = spl.subscription_id AND spl.status = 'captured'
    `;

    const queryParams = [];
    if (searchFilter) {
      query += ` WHERE u.name LIKE ? OR u.email LIKE ? `;
      queryParams.push(`%${searchFilter}%`, `%${searchFilter}%`);
    }

    // Fixed complete GROUP BY strategy matching ONLY_FULL_GROUP_BY restrictions
    query += ` 
      GROUP BY 
        u.id, 
        u.name, 
        u.email, 
        u.created_at, 
        us.id, 
        us.status, 
        us.current_end, 
        sp.name
      ORDER BY u.created_at DESC
    `;

    const [usersList] = await pool.query(query, queryParams);
    return NextResponse.json({ success: true, users: usersList });

  } catch (error) {
    console.error("Admin user fetching execution crash:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}