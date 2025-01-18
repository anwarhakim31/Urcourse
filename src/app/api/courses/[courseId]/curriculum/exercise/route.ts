import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { Answer } from "@/types/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const token = await verifyToken(request, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const { title, description, image, questions, resource, duration } =
      await request.json();

    if (!title) {
      return ResponseErrorApi(400, "Title and description are required");
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId },
      include: { curriculum: true },
    });

    if (!course) {
      return ResponseErrorApi(404, "Course not found");
    }

    if (!course.curriculum) {
      return ResponseErrorApi(404, "Curriculum not found");
    }

    const position = course.curriculum?.lastPosition || 0;

    const exercise = await db.exercise.create({
      data: {
        title,
        description: description === "<p><br></p" ? "" : description,
        image,
        duration: Number(duration),
        position: position + 1,
        curriculumId: course.curriculum.id,
        isPublished:
          Boolean(title && description && image) &&
          Array.isArray(questions) &&
          questions.length > 0,
      },
    });

    await db.curriculum.update({
      where: { id: course.curriculum.id },
      data: { lastPosition: position + 1 },
    });

    if (Array.isArray(questions) && questions.length > 0) {
      for (const question of questions) {
        const createdQuestion = await db.question.create({
          data: {
            text: question.text,
            exerciseId: exercise.id,
            image: question.image || null,
          },
        });

        if (Array.isArray(question.answers) && question.answers.length > 0) {
          await db.answer.createMany({
            data: question.answers.map((answer: Answer) => ({
              text: answer.text,
              isCorrect: answer.isCorrect,
              questionId: createdQuestion.id,
            })),
          });
        }
      }
    }

    if (Array.isArray(resource) && resource.length > 0) {
      await db.resource.createMany({
        data: resource.map((item) => ({
          name: item.name,
          file: item.file,
          exerciseId: exercise.id,
        })),
      });
    }

    return NextResponse.json(exercise);
  } catch (error) {
    console.error(`[errModule]`, error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = await verifyToken(request, true);

    if (token instanceof NextResponse) {
      return token;
    }
    const exerciseId = request.nextUrl.searchParams.get("exerciseId");

    const { title, description, image, questions, resource, duration } =
      await request.json();

    const exercise = await db.exercise.findUnique({
      where: {
        id: exerciseId as string,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        resourse: true,
      },
    });

    if (!exercise) {
      return ResponseErrorApi(404, "Exercise not found");
    }

    const updated = await db.exercise.update({
      where: {
        id: exerciseId as string,
      },
      data: {
        title,
        duration: Number(duration),
        description:
          (description as string) === "<p><br></p>" ? "" : description,
        image,
        isPublished:
          !title ||
          description === "<p><br></p>" ||
          !image ||
          questions?.length === 0
            ? false
            : exercise.isPublished,
      },
    });

    if (exercise.questions?.length !== questions.length) {
      await db.question.deleteMany({
        where: {
          exerciseId: exercise.id,
        },
      });
      if (Array.isArray(questions) && questions.length > 0) {
        await db.question.createMany({
          data: questions.map((item: { text: string; image: string }) => ({
            text: item.text,
            image: item.image,
            exerciseId: exercise.id,
          })),
        });
      }
    }

    if (exercise.resourse?.length !== resource.length) {
      await db.resource.deleteMany({
        where: {
          exerciseId: exercise.id,
        },
      });

      if (Array.isArray(resource) && resource.length > 0) {
        await db.resource.createMany({
          data: resource.map((item: { name: string; file: string }) => ({
            name: item.name,
            file: item.file,
            exerciseId: exercise.id,
          })),
        });
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.log(`[errModule]`, error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
