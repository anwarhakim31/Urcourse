import CurriculumListView from "@/components/views/course/course-detail/curriculum-list/curriculum-list-view";
import { getDataCurriculumList } from "@/lib/api-service";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Exercise, ExerciseResult, Module } from "@/types/model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const CourseCurriculumListPage = async ({
  params,
}: {
  params: { courseId: string; curriculumListId: string };
}) => {
  const { courseId, curriculumListId } = params;
  const session = await getServerSession(authOptions);
  const isPaid = await db.purchase.findFirst({
    where: {
      userId: session?.user?.id,
      courseId: courseId,
      status: "PAID",
    },
  });

  if (!session) {
    return isPaid
      ? redirect(
          "/login?callbackUrl=" +
            encodeURIComponent(`/course/${courseId}/${curriculumListId}`)
        )
      : redirect("/login");
  }

  if (!isPaid) {
    return redirect(`/course/${courseId}`);
  }

  const exerciseResult = await db.exerciseResult.findFirst({
    where: {
      userId: session?.user?.id,
      exerciseId: params.curriculumListId,
      isPassed: true,
    },
  });

  const {
    modules,
    exercise,
    nextCurriculum,
    withCertificate,
    progress,

    isActive,
  } = await getDataCurriculumList(
    courseId,
    curriculumListId,
    session?.user?.id as string
  );

  return (
    <CurriculumListView
      list={(modules as Module) || (exercise as Exercise)}
      params={params}
      nextCurriculum={nextCurriculum}
      progress={progress}
      isActive={isActive}
      witchCertificate={withCertificate}
      exerciseResult={exerciseResult as ExerciseResult}
    />
  );
};

export default CourseCurriculumListPage;
