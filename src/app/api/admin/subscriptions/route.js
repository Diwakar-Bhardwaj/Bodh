import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Access Denied" }, { status: 403 });
    }

    const { userId, subscriptionId, action, targetPlanName } = await req.json();

    const PLAN_MAPPING = {
      "Believa Pro": "plan_T6dLjO91M2gldp",
      "Believa Family": "plan_T6dNhCFLRPNSHX",
      "Believa Plus": "plan_T6dOTYnE6Wuizf"
    };

    if (action === "UPGRADE") {
      const targetPlanId = PLAN_MAPPING[targetPlanName];
      if (subscriptionId) {
        await pool.query(
          `UPDATE user_subscriptions SET plan_id = ?, status = 'active' WHERE id = ? AND user_id = ?`,
          [targetPlanId, subscriptionId, userId]
        );
      } else {
        const generatedSubId = `sub_man_${Math.random().toString(36).substring(2, 11)}`;
        await pool.query(
          `INSERT INTO user_subscriptions (id, user_id, plan_id, status) VALUES (?, ?, ?, 'active')`,
          [generatedSubId, userId, targetPlanId]
        );
      }
    } 
    else if (action === "CANCEL") {
      await pool.query(
        `UPDATE user_subscriptions SET status = 'cancelled' WHERE user_id = ?`,
        [userId]
      );
    } 
    else if (action === "GRANT_FREE_ACCESS") {
      const premiumTierId = PLAN_MAPPING["Believa Plus"];
      if (subscriptionId) {
        await pool.query(
          `UPDATE user_subscriptions SET plan_id = ?, status = 'active', current_end = '2099-12-31 23:59:59' WHERE user_id = ?`,
          [premiumTierId, userId]
        );
      } else {
        const fallbackId = `sub_free_${Math.random().toString(36).substring(2, 11)}`;
        await pool.query(
          `INSERT INTO user_subscriptions (id, user_id, plan_id, status, current_end) VALUES (?, ?, ?, 'active', '2099-12-31 23:59:59')`,
          [fallbackId, userId, premiumTierId]
        );
      }
    }

    return NextResponse.json({ success: true, message: "Synchronization complete." });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}