import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        curriculum: {
          include: {
            module: true,
            exercise: true,
          },
        },
      },
    });

    if (!course) {
      return ResponseErrorApi(404, "Course not found");
    }

    await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Course is unpublished successfully",
      code: 200,
    });
  } catch (error) {
    console.log(["courses", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
