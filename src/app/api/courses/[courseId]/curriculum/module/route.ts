import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const token = await verifyToken(request, true);

    if (token instanceof NextResponse) {
      return token;
    }

    const { title, description, video, resource } = await request.json();

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        curriculum: true,
      },
    });

    if (!course) {
      return ResponseErrorApi(404, "Course not found");
    }

    if (!course.curriculum) {
      return ResponseErrorApi(404, "Curriculum not found");
    }

    const position = course.curriculum?.lastPosition || 0;

    const newModule = await db.module.create({
      data: {
        title,
        description: description === "<p><br></p" ? "" : description,
        video,
        position: position + 1,
        curriculumId: course.curriculum?.id as string,
        isPublished: title && description && video ? true : false,
      },
    });
    if (!newModule.isPublished) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    await db.curriculum.update({
      where: {
        id: course.curriculum?.id as string,
      },
      data: {
        lastPosition: position + 1,
      },
    });

    if (resource?.length > 0) {
      await db.resource.createMany({
        data: resource.map((item: { name: string; file: string }) => ({
          name: item.name,
          file: item.file,
          moduleId: newModule.id,
        })),
      });
    }

    return NextResponse.json(newModule);
  } catch (error) {
    console.log(`[errModule]`, error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = await verifyToken(request, true);

    if (token instanceof NextResponse) {
      return token;
    }
    const moduleId = request.nextUrl.searchParams.get("moduleId");

    const { title, description, video, resource } = await request.json();

    const modules = await db.module.findUnique({
      where: {
        id: moduleId as string,
      },
      include: {
        resourse: true,
        curriculum: true,
      },
    });

    if (!modules) {
      return ResponseErrorApi(404, "Module not found");
    }

    const updated = await db.module.update({
      where: {
        id: moduleId as string,
      },
      data: {
        title,
        description:
          (description as string) === "<p><br></p>" ? "" : description,
        video,
        isPublished:
          !title || description === "<p><br></p>" || !video
            ? false
            : modules.isPublished,
      },
    });

    if (!updated.isPublished) {
      await db.course.update({
        where: {
          id: modules.curriculum.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    if (modules.resourse?.length !== resource.length) {
      await db.resource.deleteMany({
        where: {
          moduleId: moduleId as string,
        },
      });
      await db.resource.createMany({
        data: resource.map((item: { name: string; file: string }) => ({
          name: item.name,
          file: item.file,
          moduleId: updated.id,
        })),
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.log(`[errModule]`, error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
