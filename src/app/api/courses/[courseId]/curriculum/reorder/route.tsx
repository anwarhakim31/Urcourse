import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const data = await req.json();

    for (const item of data) {
      if (item.type === "module") {
        await db.module.update({
          where: {
            id: item.id,
          },
          data: {
            position: item.position,
          },
        });
      } else if (item.type === "exercise") {
        await db.exercise.update({
          where: {
            id: item.id,
          },
          data: {
            position: item.position,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      code: 200,
    });
  } catch (error) {
    console.log("error order", error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
