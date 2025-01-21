import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req);

    const { roomId } = await req.json();

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const exerciseResult = await db.exerciseResult.findUnique({
        where: {
          id: roomId,
          userId: token.id,
        },
      });

      if (!exerciseResult) return ResponseErrorApi(404, "Room not found");

      await db.exerciseResult.update({
        where: {
          id: roomId,
        },
        data: {
          isPassed: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Room passed successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
