import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const token = await verifyToken(req);

    const { listId, type } = await req.json();

    console.log(listId);

    if (token instanceof NextResponse) {
      return token;
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
      include: {
        curriculum: {
          include: {
            module: {
              where: {
                isPublished: true,
              },
              include: {
                proggress: true,
              },
            },
            exercise: {
              where: {
                isPublished: true,
              },
              include: {
                proggress: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return ResponseErrorApi(404, "Course not found");
    }

    const modules = course.curriculum?.module.find(
      (item) => item.id === listId
    );

    const exercise = course.curriculum?.exercise.find(
      (item) => item.id === listId
    );

    if (!modules && !exercise) {
      return ResponseErrorApi(404, "Curriculum list not found");
    }

    const curriculumList = [
      ...(course.curriculum?.module || []),
      ...(course.curriculum?.exercise || []),
    ].sort((a, b) => a.position - b.position);

    const proggressExercise =
      course?.curriculum?.exercise.map((item) => item.proggress) || [];
    const proggressModule =
      course?.curriculum?.module.map((item) => item.proggress) || [];
    const progressList = [...proggressModule, ...proggressExercise].flat();

    if (progressList.length === 0 && curriculumList[0].id !== listId) {
      return ResponseErrorApi(400, "Please start the course first");
    }

    if (
      progressList.length > 0 &&
      progressList.length !==
        curriculumList.findIndex((item) => item.id === listId)
    ) {
      return ResponseErrorApi(400, "Please finish the previous list");
    }

    if (progressList.includes(listId)) {
      return ResponseErrorApi(400, "You have already completed this list");
    }

    const list = () => {
      if (type === "module") {
        return {
          moduleId: listId,
        };
      } else if (type === "exercise") {
        return {
          exerciseId: listId,
        };
      }
    };

    if (token && typeof token === "object" && "id" in token) {
      await db.proggress.create({
        data: {
          userId: token.id,
          ...list(),
        },
      });

      return NextResponse.json({
        success: true,
        code: 200,
        message: "Progress created successfully",
        data: {
          nextList:
            curriculumList.findIndex((item) => item.id === listId) ===
            curriculumList.length - 1
              ? curriculumList[curriculumList.length - 1]?.id
              : curriculumList[
                  curriculumList.findIndex((item) => item.id === listId) + 1
                ]?.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
