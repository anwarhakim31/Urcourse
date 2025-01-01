import { ResponseErrorApi } from "@/lib/response-error";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return ResponseErrorApi(404, "User is not found");
    }

    const expireTime = new Date().getTime() / 1000 + 60 * 60 * 1000;

    const token = await db.resetToken.create({
      data: {
        user: user.id,
        expired: expireTime,
      },
    });

    const confirmLink = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password?token=${token.id} `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.PASSWORD_APPLICATION_EMAIL,
      },
    });

    await transporter.sendMail({
      from: "no-reply <onboarding@resend.dev>",
      to: email,
      subject: "Reset Password",
      html: `<h1>Reset Password</h1><p>Click <a href="${confirmLink}">here</a> to reset your password</p>`,
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
