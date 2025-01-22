import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const token = await verifyToken(req);

    const { fullname, email, photo } = await req.json();

    if (token instanceof NextResponse) {
      return token;
    }

    const emailIsExiest = await db.user.count({
      where: {
        email,
      },
    });

    if (emailIsExiest > 1) {
      return ResponseErrorApi(400, "Email has already taken");
    }

    const user = await db.user.update({
      where: {
        id: token?.id,
      },
      data: {
        fullname,
        email,
        photo,
      },
      select: {
        email: true,
        fullname: true,
        photo: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Update profile successfully",
      user,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
