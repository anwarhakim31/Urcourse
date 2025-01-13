import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req);

    const { courseId } = await req.json();

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!course) {
        return ResponseErrorApi(404, "Course not found");
      }

      // const alreadyPaid = await db.purchase.findFirst({
      //   where: {
      //     courseId,
      //     userId: token.id,
      //     status: "PAID",
      //   },
      // });

      // if (alreadyPaid) {
      //   return ResponseErrorApi(400, "The same course already paid");
      // }

      const isExist = await db.purchase.findFirst({
        where: {
          courseId,
          userId: token.id,
          status: "PENDING",
        },
      });

      if (isExist) {
        return NextResponse.json({
          success: true,
          message: "Purchase created successfully",
          data: isExist,
        });
      }

      const purchase = await db.purchase.create({
        data: {
          courseId,
          userId: token.id,
          status: "PENDING",
          price: course.price || 0,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Purchase created successfully",
        data: purchase,
      });
    }

    return ResponseErrorApi(401, "Unauthorized");
  } catch (error) {
    console.log("Purchase", error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
