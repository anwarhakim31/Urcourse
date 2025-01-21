import SectionWrapper from "@/components/Layouts/section-wrapper";
import BannerComponent from "@/components/views/admin/courses/banner-course";
import ExerciseCourseForm from "@/components/views/admin/courses/curriculum/exercise/execise-course-form";

import PublishComponent from "@/components/views/admin/courses/publish-component";
import { db } from "@/lib/db";
import { Exercise } from "@/types/model";
import { requiredFieldExercise } from "@/utils/helpers";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const CourseExercisePage = async ({
  params,
}: {
  params: { courseId: string; exerciseId: string };
}) => {
  if (!params.exerciseId) return notFound();

  const exercise = await db.exercise.findUnique({
    where: {
      id: params.exerciseId,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      resourse: true,
    },
  });

  if (!exercise) return notFound();

  const { totalField, complatedField, complated } = requiredFieldExercise({
    ...exercise,
    duration: exercise?.duration?.toString(),
  } as Exercise);

  // console.log(exercise);

  return (
    <SectionWrapper isScroll={true} isPadding={false}>
      <BannerComponent
        totalField={totalField}
        complatedField={complatedField}
        isPublish={exercise.isPublished}
        complated={complated}
        type="Exercise"
      />
      <div className="flex items-center justify-between p-8 pb-0">
        <Link
          href={`/admin/course/${params.courseId}/curriculum`}
          className="border w-fit p-8  rounded-md px-4 py-1.5 flex items-center gap-1 text-sm border-indigo-700 text-indigo-700 hover:bg-slate-100"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
          Back To Curriculum
        </Link>
        <PublishComponent
          type="curriculum"
          isPublished={exercise.isPublished}
          isCompleted={complated}
          id={params.exerciseId}
        />
      </div>

      <div className="p-8 pt-4">
        <ExerciseCourseForm
          exercise={
            {
              ...exercise,
              duration: exercise?.duration?.toString(),
            } as Exercise
          }
          exerciseId={params.exerciseId}
          courseId={params.courseId}
        />
      </div>
    </SectionWrapper>
  );
};

export default CourseExercisePage;
