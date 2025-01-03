import SectionWrapper from "@/components/Layouts/section-wrapper";
import BasicCourseForm from "@/components/views/admin/courses/basic/basic-course-form";
import NavigationCourse from "@/components/views/admin/courses/navigation-course";
import { db } from "@/lib/db";
import { requiredFieldCourse } from "@/utils/helpers";
import { notFound } from "next/navigation";
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
  if (!course) {
    return notFound();
  }
  const { complatedField, totalField } = requiredFieldCourse(course);

  console.log(complatedField, totalField);

  return (
    <SectionWrapper>
      <div className="flex items-center justify-between">
        <NavigationCourse course={course} />
      </div>
      <BasicCourseForm course={course} />
    </SectionWrapper>
  );
};

export default BasicCoursePage;
