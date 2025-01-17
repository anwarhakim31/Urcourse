import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  params: { params: { courseId: string } }
) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const listId = req.nextUrl.searchParams.get("listId") || "";

    if (!listId) {
      return ResponseErrorApi(400, "curriculumListId is required");
    }

    const curriculum = await db.curriculum.findUnique({
      where: {
        courseId: params.params.courseId,
      },
      include: {
        module: true,
        exercise: true,
      },
    });

    if (!curriculum) {
      return ResponseErrorApi(404, "Curriculum not found");
    }

    await db.module.deleteMany({
      where: {
        id: {
          in: listId.split(","),
        },
        curriculumId: curriculum.id,
      },
    });

    await db.exercise.deleteMany({
      where: {
        id: {
          in: listId.split(","),
        },
        curriculumId: curriculum.id,
      },
    });

    const updatedModules = await db.module.findMany({
      where: {
        curriculumId: curriculum.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    const updatedExercises = await db.exercise.findMany({
      where: {
        curriculumId: curriculum.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    const list = [...updatedModules, ...updatedExercises];
    const sort = list.sort((a, b) => a.position - b.position);

    const updatedPosition = sort.map((item, index) => ({
      id: item.id,
      position: index + 1,
      type: item.type,
    }));

    updatedPosition.forEach(async (item) => {
      if (item.type === "module") {
        await db.module.update({
          where: {
            id: item.id,
          },
          data: {
            position: item.position,
          },
        });
      } else {
        await db.exercise.update({
          where: {
            id: item.id,
          },
          data: {
            position: item.position,
          },
        });
      }
    });

    await db.curriculum.update({
      where: {
        id: curriculum.id,
      },
      data: {
        lastPosition: updatedPosition.length,
      },
    });

    if (curriculum.module.length === 0 && curriculum.exercise.length === 0) {
      await db.course.update({
        where: {
          id: params.params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Curriculum list deleted successfully",
      code: 200,
    });
  } catch (error) {
    console.log(["delete Curriculum"], error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
