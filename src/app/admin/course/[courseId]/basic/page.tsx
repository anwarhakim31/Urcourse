import SectionWrapper from "@/components/Layouts/section-wrapper";
import BasicCourseForm from "@/components/views/admin/courses/basic/basic-course-form";
import NavigationCourse from "@/components/views/admin/courses/navigation-course";
import { db } from "@/lib/db";
import { requiredFieldCourse } from "@/utils/helpers";
import { notFound, redirect } from "next/navigation";
import React from "react";

const BasicCoursePage = async ({
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
  });

  const category = await db.category.findMany();

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
      <BasicCourseForm course={course} category={category} />
    </SectionWrapper>
  );
};

export default BasicCoursePage;
