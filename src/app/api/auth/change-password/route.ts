import { ResponseErrorApi } from "@/lib/response-error";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";

export async function PATCH(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();

    const token = await verifyToken(req);

    if (token instanceof NextResponse) {
      return token;
    }

    const user = await db.user.findUnique({
      where: {
        id: token?.id,
      },
    });

    if (!user) {
      return ResponseErrorApi(404, "User not found");
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return ResponseErrorApi(401, "Old password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await db.user.update({
      where: {
        id: token?.id,
      },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
