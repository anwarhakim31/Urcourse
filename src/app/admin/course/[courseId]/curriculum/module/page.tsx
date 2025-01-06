import SectionWrapper from "@/components/Layouts/section-wrapper";
import ModuleCourseForm from "@/components/views/admin/courses/curriculum/module/module-course-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CourseModulePage = ({ params }: { params: { courseId: string } }) => {
  return (
    <SectionWrapper isScroll={true}>
      <Link
        href={`/admin/course/${params.courseId}/curriculum`}
        className="border w-fit rounded-md px-4 py-1.5 flex items-center gap-1 text-sm border-indigo-700 text-indigo-700 hover:bg-slate-100"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
        Back To Curriculum
      </Link>

      <ModuleCourseForm module={{}} courseId={params.courseId} />
    </SectionWrapper>
  );
};

export default CourseModulePage;
