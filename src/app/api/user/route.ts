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

    const user = await db.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            fullname: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
        isAdmin: false,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await db.user.count({
      where: {
        OR: [
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            fullname: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
        isAdmin: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      data: {
        user,
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

    const isExist = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      return ResponseErrorApi(404, "User not found");
    }

    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json({
      success: true,
      message: "user updated successfully",
      data: user,
      code: 200,
    });
  } catch (error) {
    console.log(["user", error]);
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

    const isExist = await db.user.findMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    if (data.length !== isExist.length) {
      return ResponseErrorApi(404, "User not found");
    }

    await db.user.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "User Deleted successfully",

      code: 200,
    });
  } catch (error) {
    console.log(["Category", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
