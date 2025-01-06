import SectionWrapper from "@/components/Layouts/section-wrapper";
import CurriculumListView from "@/components/views/admin/courses/curriculum/curriculum-list-view";
import NavigationCourse from "@/components/views/admin/courses/navigation-course";
import { db } from "@/lib/db";
import { requiredFieldCourse } from "@/utils/helpers";
import { BookText } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

const CuriculumCoursePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { courseId } = params;

  if (!courseId) {
    return notFound();
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      curriculum: {
        include: {
          module: true,
          exercise: true,
        },
      },
    },
  });

  const curriculum = [
    ...(course?.curriculum?.module || []),
    ...(course?.curriculum?.exercise || []),
  ];

  const sortCuricul = curriculum.sort((a, b) => a.position - b.position);
  const data = sortCuricul.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    position: item.position,
  }));

  if (!course) {
    return redirect("/error");
  }
  const { complatedField, totalField } = requiredFieldCourse(course);

  console.log(complatedField, totalField);

  return (
    <SectionWrapper isScroll={true}>
      <div className="flex items-center justify-between">
        <NavigationCourse course={course} />
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-slate-500">
          Manage cirriculum for this course
        </p>
        <div className="flex items-center gap-2">
          <Link
            className="border border-indigo-700 text-indigo-700  hover:bg-slate-50 rounded-md  flex items-center gap-2 text-sm px-4 py-1.5"
            href={`/admin/course/${courseId}/curriculum/module`}
          >
            <BookText size={18} strokeWidth={1.5} />
            Add Module
          </Link>
        </div>
      </div>
      <CurriculumListView data={data} courseId={courseId} />
    </SectionWrapper>
  );
};

export default CuriculumCoursePage;
