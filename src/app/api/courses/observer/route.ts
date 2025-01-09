import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

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
      },
    });

    return NextResponse.json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
      code: 200,
    });
  } catch (error) {
    console.log(["courses", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
