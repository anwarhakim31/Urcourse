import SectionWrapper from "@/components/Layouts/section-wrapper";
import BannerComponent from "@/components/views/admin/courses/banner-course";
import ModuleCourseForm from "@/components/views/admin/courses/curriculum/module/module-course-form";
import PublishComponent from "@/components/views/admin/courses/publish-component";
import { db } from "@/lib/db";
import { Module } from "@/types/model";
import { requiredFieldModule } from "@/utils/helpers";
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

  const { totalField, complatedField, complated } = requiredFieldModule(
    currentModule as Module
  );

  return (
    <SectionWrapper isScroll={true} isPadding={false}>
      <BannerComponent
        totalField={totalField}
        complatedField={complatedField}
        isPublish={currentModule.isPublished}
        complated={complated}
        type="Module"
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
          isPublished={currentModule.isPublished}
          isCompleted={complated}
          id={params.moduleId}
        />
      </div>

      <div className="p-8 pt-4">
        <ModuleCourseForm
          module={currentModule as Module}
          courseId={params.courseId}
          moduleId={params.moduleId}
        />
      </div>
    </SectionWrapper>
  );
};

export default CourseModulePage;
