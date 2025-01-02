import { db } from "@/lib/db";
import { requiredFieldCourse } from "@/utils/helpers";
import { notFound } from "next/navigation";

import React from "react";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });
  if (!course) {
    return notFound();
  }

  const { totalField, complatedField } = requiredFieldCourse(course);

  return (
    <div>
      <h1>{course?.title}</h1>
      <p>
        {complatedField}/{totalField}
      </p>
    </div>
  );
};

export default CourseIdPage;
