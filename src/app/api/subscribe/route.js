// import { NextResponse } from "next/server";
// import razorpay from "@/lib/razorpay";
// import pool from "@/lib/db";

// // Map plan identifiers from your UI strings directly to real Razorpay Dashboard Plan IDs
// const PLAN_MAPPING = {
//   "Believa Pro": "plan_T6dLjO91M2gldp",
//   "Believa Family": "plan_T6dNhCFLRPNSHX",
//   "Believa Plus": "plan_T6dOTYnE6Wuizf"
// };

// export async function POST(req) {
//   try {
//     // Simulated auth identifier (Swap with real session framework like NextAuth context)
//     const mockUserId = 1; 
//     const { planName } = await req.json();

//     const targetPlanId = PLAN_MAPPING[planName];
//     if (!targetPlanId) {
//       return NextResponse.json({ success: false, message: "Invalid Plan layout targeted." }, { status: 400 });
//     }

//     // 1. Generate the transactional subscription instance ledger in Razorpay systems
//     const subscriptionSession = await razorpay.subscriptions.create({
//       plan_id: targetPlanId,
//       total_count: 12, // Pre-authorize automated recurring schedules up to 12 billing counts
//       quantity: 1,
//       customer_notify: 1, // Instruct Razorpay to fire automated alerts via email/SMS
//       notes: {
//         userId: mockUserId.toString(),
//       }
//     });

//     // 2. Commit transaction metadata state into local tracking architecture
//     await pool.query(
//       `INSERT INTO user_subscriptions (id, user_id, plan_id, status) 
//        VALUES (?, ?, ?, ?)`,
//       [subscriptionSession.id, mockUserId, targetPlanId, "created"]
//     );

//     return NextResponse.json({
//       success: true,
//       subscriptionId: subscriptionSession.id,
//       keyId: process.env.RAZORPAY_KEY_ID
//     });

//   } catch (error) {
//     console.error("Gateway execution initialization failure:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import getRazorpayClient from "@/lib/razorpay"; // 🔄 Changed: Import the function wrapper instead of the raw instance
import pool from "@/lib/db";

// Map plan identifiers from your UI strings directly to real Razorpay Dashboard Plan IDs
const PLAN_MAPPING = {
  "Believa Pro": "plan_T6dLjO91M2gldp",
  "Believa Family": "plan_T6dNhCFLRPNSHX",
  "Believa Plus": "plan_T6dOTYnE6Wuizf"
};

export async function POST(req) {
  try {
    // Simulated auth identifier (Swap with real session framework like NextAuth context)
    const mockUserId = 1; 
    const { planName } = await req.json();

    const targetPlanId = PLAN_MAPPING[planName];
    if (!targetPlanId) {
      return NextResponse.json({ success: false, message: "Invalid Plan layout targeted." }, { status: 400 });
    }

    // 🔄 Added: Safely initialize the Razorpay client on-demand inside the runtime execution thread
    const razorpay = getRazorpayClient();

    // 1. Generate the transactional subscription instance ledger in Razorpay systems
    const subscriptionSession = await razorpay.subscriptions.create({
      plan_id: targetPlanId,
      total_count: 12, // Pre-authorize automated recurring schedules up to 12 billing counts
      quantity: 1,
      customer_notify: 1, // Instruct Razorpay to fire automated alerts via email/SMS
      notes: {
        userId: mockUserId.toString(),
      }
    });

    // 2. Commit transaction metadata state into local tracking architecture
    await pool.query(
      `INSERT INTO user_subscriptions (id, user_id, plan_id, status) 
       VALUES (?, ?, ?, ?)`,
      [subscriptionSession.id, mockUserId, targetPlanId, "created"]
    );

    return NextResponse.json({
      success: true,
      subscriptionId: subscriptionSession.id,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("Gateway execution initialization failure:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}