import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const category = await db.category.findMany();

    return NextResponse.json({
      success: true,
      message: "Categories fetched successfully",
      data: {
        category,
      },
      code: 200,
    });
  } catch (error) {
    console.log(["Categorys", error]);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
