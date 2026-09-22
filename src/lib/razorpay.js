// import Razorpay from "razorpay";

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error("Missing vital Razorpay system environment variables inside process variables scope.");
// }

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export default razorpay;

import Razorpay from "razorpay";

let razorpayInstance = null;

export default function getRazorpayClient() {
  // Return the existing instance if it has already been initialized
  if (razorpayInstance) return razorpayInstance;

  // Run the validation check only when this function is explicitly executed
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Missing vital Razorpay system environment variables inside process variables scope.");
  }

  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  return razorpayInstance;
}