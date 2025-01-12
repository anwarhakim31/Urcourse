import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    const filter = [];

    if (category) {
      filter.push({
        categoryId: category,
      });
    }

    const courses = await db.course.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        isPublished: true,
        AND: filter,
      },
      include: {
        category: true,
        curriculum: {
          include: {
            module: true,
            exercise: true,
          },
        },
      },
    });

    // const course = courses.map((course) => {
    //   const modulec = course?.curriculum?.module.map((module) =>
    //     module.isPublished ? module : null
    //   );
    //   const exercise = course?.curriculum?.exercise.map((exercise) =>
    //     exercise.isPublished ? exercise : null
    //   );

    //   const curriculumList = [...(modulec || []), ...(exercise || [])].sort(
    //     (a, b) => {
    //       if (a && a.position != null && b && b.position != null) {
    //         return a.position - b.position;
    //       }
    //       return 0;
    //     }
    //   );

    //   return { ...course, modulec, exercise, firstList: curriculumList[0] };
    // });

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
