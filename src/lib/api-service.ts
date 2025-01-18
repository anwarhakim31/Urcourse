import { redirect } from "next/navigation";
import { db } from "./db";

export async function getCategory() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/main`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return redirect("/error");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurriculum(courseId: string, userId?: string) {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      category: true,
      curriculum: {
        include: {
          module: {
            where: {
              isPublished: true,
            },
            include: {
              proggress: {
                where: {
                  userId: userId,
                },
              },
            },
          },
          exercise: {
            where: {
              isPublished: true,
            },
            include: {
              proggress: {
                where: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return redirect("/course");
  }

  const curriculumList = [
    ...(course.curriculum?.module || []),
    ...(course.curriculum?.exercise || []),
  ].sort((a, b) => a.position - b.position);

  return {
    course,
    curriculumList,
  };
}

export async function getDataCurriculumList(
  courseId: string,
  curriculumListId: string,
  userId: string
) {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      curriculum: {
        include: {
          module: {
            where: {
              isPublished: true,
            },
            include: {
              proggress: {
                where: {
                  userId: userId,
                },
              },
            },
          },
          exercise: {
            where: {
              isPublished: true,
            },
            include: {
              proggress: {
                where: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return redirect("/course");
  }

  const curriculumList = [
    ...(course.curriculum?.module || []),
    ...(course.curriculum?.exercise || []),
  ].sort((a, b) => a.position - b.position);

  if (!curriculumList.find((item) => item.id === curriculumListId)) {
    return redirect(`/course/${courseId}/${curriculumList[0]?.id}`);
  }

  //membuat curriculum selanjutnya
  const nextCurriculum =
    curriculumList.findIndex((item) => item.id === curriculumListId) ===
    curriculumList.length - 1
      ? curriculumList[curriculumList.length - 1]?.id
      : curriculumList[
          curriculumList.findIndex((item) => item.id === curriculumListId) + 1
        ]?.id;

  //menhitung progress
  const proggressExercise =
    course?.curriculum?.exercise.map((item) => item.proggress) || [];
  const proggressModule =
    course?.curriculum?.module.map((item) => item.proggress) || [];
  const proggressList = [...proggressModule, ...proggressExercise].flat();

  if (
    curriculumList.findIndex((item) => item.id === curriculumListId) !== 0 &&
    !proggressList.some(
      (item) =>
        curriculumList[
          curriculumList.findIndex((item) => item.id === curriculumListId)
        ]?.id !== item.moduleId ||
        curriculumList[
          curriculumList.findIndex((item) => item.id === curriculumListId)
        ].id !== item.exerciseId
    )
  )
    return redirect(`/course/${courseId}/${curriculumList[0]?.id}`);

  const curriculumListLength = curriculumList.length;
  const userProgressLength = proggressList.length;
  const modules = curriculumList.find((item) => item.id === curriculumListId);
  const exercise = curriculumList.find((item) => item.id === curriculumListId);
  const progress = Math.round(
    (userProgressLength / curriculumListLength) * 100
  );

  //set aktif saat curriculum list sudah selesai //bukan course
  const isActive = proggressList.find(
    (item) =>
      item.exerciseId === curriculumListId || item.moduleId === curriculumListId
  );

  const withCertificate = course.certificate;

  return {
    nextCurriculum,
    progress,
    modules,
    exercise,
    withCertificate,
    isActive: !!isActive,
  };
}
