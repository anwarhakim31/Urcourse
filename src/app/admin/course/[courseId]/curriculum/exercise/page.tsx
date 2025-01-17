import SectionWrapper from "@/components/Layouts/section-wrapper";
import ExerciseCourseForm from "@/components/views/admin/courses/curriculum/exercise/execise-course-form";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CourseModulePage = ({
  params,
}: {
  params: { courseId: string; exerciseId: string };
}) => {
  return (
    <SectionWrapper isScroll={true}>
      <Link
        href={`/admin/course/${params.courseId}/curriculum`}
        className="border w-fit rounded-md px-4 py-1.5 flex items-center gap-1 text-sm border-indigo-700 text-indigo-700 hover:bg-slate-100"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
        Back To Curriculum
      </Link>

      <ExerciseCourseForm
        exerciseId={params.exerciseId}
        courseId={params.courseId}
      />
    </SectionWrapper>
  );
};

export default CourseModulePage;
