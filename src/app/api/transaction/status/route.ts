import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await verifyToken(req);
    const searchParams = new URL(req.url).searchParams;

    const paymentId = searchParams.get("paymentId");

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const transaction = await db.transaction.findFirst({
        where: {
          id: paymentId || "",
        },

        include: {
          purchase: {
            include: {
              course: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      });

      if (!transaction) {
        return ResponseErrorApi(404, "Transaction not found");
      }

      if (
        transaction.status === "PENDING" &&
        new Date(transaction.expired) < new Date()
      ) {
        const transactionUpdate = await db.transaction.update({
          where: { id: transaction.id },
          data: {
            status: "FAILED",
          },
          include: {
            purchase: {
              include: {
                course: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        });
        await db.purchase.update({
          where: { id: transaction.purchaseId },
          data: {
            status: "EXPIRED",
          },
        });

        return NextResponse.json({
          success: true,
          message: "success get transaction payment",
          data: transactionUpdate,
          code: 200,
        });
      }

      return NextResponse.json({
        success: true,
        message: "success get transaction payment",
        data: transaction,
        code: 200,
      });
    }
  } catch (error) {
    console.log("[error]", error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
