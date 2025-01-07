import SectionWrapper from "@/components/Layouts/section-wrapper";
import ModuleCourseForm from "@/components/views/admin/courses/curriculum/module/module-course-form";
import { db } from "@/lib/db";
import { Module } from "@/types/model";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const CourseModulePage = async ({
  params,
}: {
  params: { courseId: string; moduleId: string };
}) => {
  if (!params.moduleId) return notFound();

  const currentModule = await db.module.findUnique({
    where: {
      id: params.moduleId,
    },
  });

  if (!currentModule) return notFound();

  return (
    <SectionWrapper isScroll={true}>
      <Link
        href={`/admin/course/${params.courseId}/curriculum`}
        className="border w-fit rounded-md px-4 py-1.5 flex items-center gap-1 text-sm border-indigo-700 text-indigo-700 hover:bg-slate-100"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
        Back To Curriculum
      </Link>

      <ModuleCourseForm
        module={currentModule as Module}
        courseId={params.courseId}
        moduleId={params.moduleId}
      />
    </SectionWrapper>
  );
};

export default CourseModulePage;
