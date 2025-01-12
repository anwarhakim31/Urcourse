import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { calculateFeeAndPPN, formatPaymentMethod } from "@/utils/helpers";
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req);
    const { purchaseId, paymentType, paymentName } = await req.json();

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const purchase = await db.purchase.findUnique({
        where: {
          id: purchaseId,
        },
      });

      if (!purchase) {
        return ResponseErrorApi(404, "Purchase not found");
      }

      const { total } = calculateFeeAndPPN(
        purchase?.price as number,
        paymentType
      );

      const currentTime = new Date();
      const expirationTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
      const invoice = `INV-${currentTime.getTime()}`;

      const xenditResponse = await axios.post(
        "https://api.xendit.co/callback_virtual_accounts",
        {
          external_id: invoice,
          bank_code: paymentName.toUpperCase(),
          name: token.fullname,
          expected_amount: total,
          is_closed: true,
          in_single_use: true,
          expiration_date: expirationTime.toISOString(),
          currency: "IDR",
          country: "ID",
        },
        {
          auth: {
            username: process.env.XENDIT_SECRET_KEY as string,
            password: "",
          },
        }
      );

      if (xenditResponse.status !== 200) {
        return ResponseErrorApi(500, xenditResponse.data.message);
      }

      const paymentMethod = formatPaymentMethod(paymentType as string);

      const transaction = await db.transaction.create({
        data: {
          purchaseId,
          amount: total,
          paymentMethod,
          paymentName: paymentName,
          xenditCode: xenditResponse?.data?.account_number,
          status: "PENDING",
          expired: expirationTime,
          invoice: invoice,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Transaction created successfully",
        data: transaction,
      });
    }
  } catch (error) {
    console.log("[error]", error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
