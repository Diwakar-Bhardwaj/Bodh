import crypto from "crypto";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const rawBody = await req.text();

    // Verify webhook authenticity
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature challenge payload matching." }, { status: 400 });
    }

    const jsonPayload = JSON.parse(rawBody);
    const subscriptionEntity = jsonPayload.payload.subscription?.entity;

    if (!subscriptionEntity) {
      return NextResponse.json({ status: "ignored" });
    }

    const subscriptionId = subscriptionEntity.id;
    const currentStart = new Date(subscriptionEntity.current_start * 1000);
    const currentEnd = new Date(subscriptionEntity.current_end * 1000);
    const status = subscriptionEntity.status; // 'active', 'halted', 'cancelled'

    switch (jsonPayload.event) {
      case "subscription.activated":
      case "subscription.charged":
        // Sync core membership status & active timing thresholds
        await pool.query(
          `UPDATE user_subscriptions 
           SET status = ?, current_start = ?, current_end = ? 
           WHERE id = ?`,
          [status, currentStart, currentEnd, subscriptionId]
        );

        // Record invoice payment transaction receipt history logs
        const paymentEntity = jsonPayload.payload.payment?.entity;
        if (paymentEntity) {
          await pool.query(
            `INSERT INTO subscription_payments_log (id, subscription_id, amount, status, method, created_at)
             VALUES (?, ?, ?, ?, ?, FROM_UNIXTIME(?))
             ON DUPLICATE KEY UPDATE status = ?`,
            [
              paymentEntity.id,
              subscriptionId,
              paymentEntity.amount / 100, // Denominated from currency units paise to base rupees
              paymentEntity.status,
              paymentEntity.method,
              paymentEntity.created_at,
              paymentEntity.status
            ]
          );
        }
        break;

      case "subscription.halted":
      case "subscription.cancelled":
        await pool.query(
          `UPDATE user_subscriptions SET status = ? WHERE id = ?`,
          [status, subscriptionId]
        );
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook synchronization logic break error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}