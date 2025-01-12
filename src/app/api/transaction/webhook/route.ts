// app/api/webhook/xendit/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Fungsi untuk menangani POST request
export async function POST(req: Request) {
  try {
    const payload = await req.json();

    console.log({ payload });
    if (!payload) {
      return NextResponse.json(
        { message: "No payload received" },
        { status: 400 }
      );
    }

    const paymentStatus = payload.status;
    const transactionId = payload.external_id;

    if (paymentStatus === "SUCCESS") {
      await db.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          status: "PAID",
        },
      });
      console.log(`Payment Success for Transaction: ${transactionId}`);
    } else if (paymentStatus === "FAILED") {
      // Pembayaran gagal
      console.log(`Payment Failed for Transaction: ${transactionId}`);
      // Lakukan update status pembayaran di database atau sistem Anda
    } else {
      // Status lainnya (misalnya pending)
      console.log(
        `Payment status: ${paymentStatus} for Transaction: ${transactionId}`
      );
    }

    // Kirim response OK ke Xendit
    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
