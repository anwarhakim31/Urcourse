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

    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");

    const filter = [];

    if (status) {
      filter.push({
        isPublished: Boolean(status),
      });
    }

    const courses = await db.course.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        AND: filter,
      },
      skip,
      take: limit,
      include: {
        curriculum: {
          include: {
            module: true,
            exercise: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const total = await db.course.count({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        AND: filter,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Courses fetched successfully",
      data: {
        courses,
        paging: {
          page,
          limit,
          total,
          totalPage: Math.ceil(total / limit),
        },
      },
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

    await db.curriculum.create({
      data: {
        courseId: newCourse.id,
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
    const { title, description, categoryId, level, price, image } =
      await req.json();

    console.log(description);

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
        title,
        description:
          (description as string) === "<p><br></p>" ? "" : description,
        categoryId,
        level,
        price,
        image,
        isPublished:
          !title ||
          description === "<p><br></p>" ||
          !image ||
          !price ||
          !categoryId ||
          !level ||
          !price
            ? false
            : isExist.isPublished,
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

export async function DELETE(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const data = await req.json();

    const isExist = await db.course.findMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    if (data.length !== isExist.length) {
      return ResponseErrorApi(404, "Course not found");
    }

    await db.course.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Course Deleted successfully",
      code: 200,
    });
  } catch (error) {
    console.log(["courses", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
