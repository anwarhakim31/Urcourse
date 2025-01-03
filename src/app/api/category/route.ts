import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get("page") || "1");
    const limit = Number(req.nextUrl.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const search = req.nextUrl.searchParams.get("search") || "";

    console.log(page, limit, skip, search);

    const category = await db.category.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      skip,
      take: limit,
      orderBy: {
        updatedAt: "desc",
      },
    });

    const total = await db.category.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Categories fetched successfully",
      data: {
        category,
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
    console.log(["Categorys", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const { name } = await req.json();

    if (!name) {
      return ResponseErrorApi(400, "Name is required");
    }

    const isExist = await db.category.findUnique({
      where: {
        name,
      },
    });

    if (isExist) {
      return ResponseErrorApi(400, "Category name already taken");
    }

    const newCategory = await db.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
      code: 200,
    });
  } catch (error) {
    console.log(["Categorys", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await verifyToken(req, true);

    if (token instanceof NextResponse) {
      return token;
    }
    const id = req.nextUrl.searchParams.get("id") || "";
    const data = await req.json();

    if (!id) {
      return ResponseErrorApi(400, "ID is required");
    }

    const isExist = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      return ResponseErrorApi(404, "Category not found");
    }

    const course = await db.category.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      data: course,
      code: 200,
    });
  } catch (error) {
    console.log(["Category", error]);
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

    const isExist = await db.category.findMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    if (data.length !== isExist.length) {
      return ResponseErrorApi(404, "Category not found");
    }

    await db.category.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category Deleted successfully",

      code: 200,
    });
  } catch (error) {
    console.log(["Category", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
