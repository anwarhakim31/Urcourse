import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    const page = Number(req.nextUrl.searchParams.get("page") || "1");
    const limit = Number(req.nextUrl.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const search = req.nextUrl.searchParams.get("search") || "";

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const purchases = await db.purchase.findMany({
        where: {
          userId: token.id,
          course: {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        include: {
          course: true,
        },
        skip,
        take: limit,
      });

      return NextResponse.json({ success: true, data: purchases });
    }

    return ResponseErrorApi(401, "Unauthorized");
  } catch (error) {
    console.log("Purchase", error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
