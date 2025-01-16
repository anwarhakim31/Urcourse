import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req);

    if (token instanceof NextResponse) {
      return token;
    }

    const { courseId, rating, comment } = await req.json();

    if (!courseId || !rating || !comment) {
      return ResponseErrorApi(400, "All fields are required");
    }

    if (token && typeof token === "object" && "id" in token) {
      const purchase = await db.purchase.findFirst({
        where: {
          courseId,
          userId: token.id,
          status: "PAID",
        },
      });

      if (!purchase) {
        return ResponseErrorApi(404, "Purchase not found");
      }

      const alreadyRating = await db.rating.findFirst({
        where: {
          courseId,
          userId: token.id,
        },
      });

      if (alreadyRating) {
        return ResponseErrorApi(400, "You have already rated this course");
      }

      await db.rating.create({
        data: {
          rating,
          comment,
          courseId,
          userId: token.id,
        },
      });

      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
        select: {
          averageRating: true,
          ratingCount: true,
        },
      });

      const courseAverageRating = course?.averageRating || 0;
      const totalReviews = course?.ratingCount || 0;

      if (courseAverageRating === 0) {
        await db.course.update({
          where: {
            id: courseId,
          },
          data: {
            averageRating: rating,
            ratingCount: 1,
          },
        });
      } else {
        const averageRating =
          (courseAverageRating * totalReviews + rating) / (totalReviews + 1);

        await db.course.update({
          where: {
            id: courseId,
          },
          data: {
            averageRating: averageRating,
            ratingCount: totalReviews + 1,
          },
        });

        return NextResponse.json({ message: "Rating added successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
