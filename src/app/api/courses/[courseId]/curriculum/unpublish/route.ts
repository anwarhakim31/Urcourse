import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const listId = req.nextUrl.searchParams.get("listId") || null;

    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    if (!listId) {
      return ResponseErrorApi(400, "curriculumListId is required");
    }

    const exercise = await db.exercise.findUnique({
      where: {
        id: listId,
      },
      select: {
        isPublished: true,
      },
    });

    const currentModule = await db.module.findUnique({
      where: {
        id: listId,
      },
      select: {
        isPublished: true,
      },
    });

    if (currentModule) {
      await db.module.update({
        where: {
          id: listId,
        },
        data: {
          isPublished: false,
        },
      });
    } else if (exercise) {
      await db.exercise.update({
        where: {
          id: listId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json({
      message: "unpublish successfully",
      success: true,
    });
  } catch (error) {
    console.log(["error ", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
