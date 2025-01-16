import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;

    const token = await verifyToken(req);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    const filter = [];

    if (category) {
      filter.push({
        categoryId: category,
      });
    }

    const courses = await db.course.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        isPublished: true,
        AND: filter,
      },
      include: {
        category: true,
        curriculum: {
          include: {
            module: true,
            exercise: true,
          },
        },
      },
    });

    if (token && typeof token === "object" && "id" in token) {
      const purchased = await db.purchase.findMany({
        where: {
          userId: token.id,
          status: "PAID",
        },
        include: {
          course: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Courses fetched successfully",
        data: {
          course: courses,
          purchased: purchased.map((item) => item.course),
        },
        code: 200,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Courses fetched successfully",
      data: {
        course: courses,
      },
      code: 200,
    });
  } catch (error) {
    console.log(["courses", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
