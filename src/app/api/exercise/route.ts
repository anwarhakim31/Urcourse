import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { Answer } from "@/types/model";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req);

    const { exerciseId } = await req.json();

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const totalQuestions = await db.question.count({
        where: {
          exerciseId,
        },
      });

      const alreadyExist = await db.exerciseResult.findFirst({
        where: {
          exerciseId,
          userId: token.id,
        },
      });

      if (alreadyExist) {
        return NextResponse.json({
          success: true,
          message: "Exercise result already exist",
          data: alreadyExist,
        });
      }

      const exerciseResult = await db.exerciseResult.create({
        data: {
          exerciseId,
          userId: token.id,
          score: 0,
          totalQuestions,
          correctAnswers: 0,
          alreadyAnswer: [],
        },
      });

      return NextResponse.json({
        success: true,
        message: "Exercise result created successfully",
        data: exerciseResult,
      });
    }
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await verifyToken(req);

    const searchParams = new URL(req.url).searchParams;

    const roomid = searchParams.get("roomId") || "";

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const exerciseResult = await db.exerciseResult.findFirst({
        where: {
          id: roomid,
          userId: token.id,
        },
        include: {
          exercise: true,
        },
      });

      if (!exerciseResult) {
        return ResponseErrorApi(404, "Exercise result not found");
      }

      if (!exerciseResult.timeRemaining && exerciseResult.exercise.duration) {
        const expired = await db.exerciseResult.update({
          where: {
            id: roomid,
          },
          data: {
            timeRemaining:
              (new Date().getTime() +
                60 * 1000 * exerciseResult.exercise.duration) /
              1000,
          },
        });

        exerciseResult.timeRemaining = expired.timeRemaining;
      }

      const questions = await db.question.findMany({
        where: {
          exerciseId: exerciseResult.exercise.id,
        },
        include: {
          answers: {
            select: {
              id: true,
              text: true,
            },
          },
        },
      });

      const lastIndex = Array.isArray(exerciseResult.alreadyAnswer)
        ? exerciseResult.alreadyAnswer.length - 1
        : 0;

      const currentQuestion = questions.findIndex((question) => {
        return (
          question.id ===
          (exerciseResult?.alreadyAnswer as Answer[])[lastIndex]?.questionId
        );
      });

      return NextResponse.json({
        success: true,
        message: "Get exercise result successfully",
        data: {
          exerciseResult,
          questions: questions,
          currentQuestions:
            currentQuestion + 1 === exerciseResult.totalQuestions
              ? currentQuestion
              : currentQuestion + 1,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
