import { ResponseErrorApi } from "@/lib/response-error";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, fullname, password } = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return ResponseErrorApi(400, "Email has already taken");
    }

    const user = await db.user.create({
      data: {
        email,
        fullname,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user,
      code: 201,
    });
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
