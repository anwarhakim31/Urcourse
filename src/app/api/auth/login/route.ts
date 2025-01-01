import { ResponseErrorApi } from "@/lib/response-error";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return ResponseErrorApi(404, "Email or Password is wrong");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return ResponseErrorApi(400, "Email or Password is wrong");
    }

    return NextResponse.json({
      success: true,
      message: "Login successfully",
      user,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
