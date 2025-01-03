import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const courses = await db.course.findMany({
      include: {
        // chapters: true,
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

export async function PATCH(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }
    const id = req.nextUrl.searchParams.get("id") || "";
    const data = await req.json();

    if (!id) {
      return ResponseErrorApi(400, "ID is required");
    }

    const isExist = await db.course.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      return ResponseErrorApi(404, "Course not found");
    }

    const course = await db.course.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      data: course,
      code: 200,
    });
  } catch (error) {
    console.log(["courses", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
