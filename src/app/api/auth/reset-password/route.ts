import { ResponseErrorApi } from "@/lib/response-error";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { password, token } = await req.json();

    const data = await db.resetToken.findUnique({
      where: {
        id: token,
      },
    });

    if (!data) {
      return ResponseErrorApi(400, "Token not valid");
    }

    if (new Date().getTime() / 1000 > data.expired) {
      await db.resetToken.delete({
        where: {
          id: data.id,
        },
      });
      return ResponseErrorApi(400, "Token is Expired");
    }

    const gentSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, gentSalt);

    await db.user.update({
      where: {
        id: data.user,
      },
      data: {
        password: hashPassword,
      },
    });

    await db.resetToken.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Email has been sent",
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
