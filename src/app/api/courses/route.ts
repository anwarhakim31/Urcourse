import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const { title } = await req.json();

    if (!title) {
      return ResponseErrorApi(400, "Title is required");
    }

    const newCourse = await db.course.create({
      data: {
        title,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
      code: 200,
    });
  } catch (error) {
    console.log(["courses", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
