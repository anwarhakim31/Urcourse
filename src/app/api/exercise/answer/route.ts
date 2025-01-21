import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req);

    const { roomId, questionId, answerId } = await req.json();

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const exerciseResult = await db.exerciseResult.findUnique({
        where: {
          id: roomId,
          userId: token.id,
        },
      });

      if (!exerciseResult) return ResponseErrorApi(404, "Room not found");

      const question = await db.question.findUnique({
        where: {
          id: questionId,
        },
        include: {
          answers: true,
        },
      });

      if (!question) return ResponseErrorApi(404, "question not found");

      if (
        question.answers.find((answer) => answer.id === answerId)?.isCorrect
      ) {
        const updated = await db.exerciseResult.update({
          where: {
            id: roomId,
          },
          data: {
            correctAnswers: {
              increment: 1,
            },
            score: Math.round(
              ((exerciseResult.correctAnswers + 1) * 100) /
                exerciseResult.totalQuestions
            ),
            alreadyAnswer: [
              ...(Array.isArray(exerciseResult?.alreadyAnswer)
                ? exerciseResult.alreadyAnswer
                : []),
              { questionId, answerId },
            ],
          },
        });
        return NextResponse.json({
          success: true,
          message: "Answer submitted successfully",
          data: {
            score: updated.score,
            isCorrect: true,
            correctAnswer: [answerId],
            wrongAnswer: [],
          },
        });
      } else {
        await db.exerciseResult.update({
          where: {
            id: roomId,
          },
          data: {
            alreadyAnswer: [
              ...(Array.isArray(exerciseResult?.alreadyAnswer)
                ? exerciseResult.alreadyAnswer
                : []),
              { questionId, answerId },
            ],
          },
        });
        return NextResponse.json({
          success: true,
          message: "Answer submitted successfully",
          data: {
            score: Math.round(
              (exerciseResult.correctAnswers * 100) /
                exerciseResult.totalQuestions
            ),
            isCorrect: false,
            correctAnswer: question.answers
              .filter((answer) => answer.isCorrect)
              .map((answer) => answer.id),
            wrongAnswer: [answerId],
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
