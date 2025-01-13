// app/api/webhook/xendit/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    console.log(payload);

    if (!payload) {
      return NextResponse.json(
        { message: "No payload received" },
        { status: 400 }
      );
    }

    const transaction = await db.transaction.findUnique({
      where: { invoice: payload.external_id },
    });

    if (transaction) {
      const result = await db.transaction.update({
        where: { id: transaction.id },
        data: { status: "PAID" },
      });
      console.log({ result });
      await db.purchase.update({
        where: { id: transaction.purchaseId },
        data: { status: "PAID" },
      });
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
