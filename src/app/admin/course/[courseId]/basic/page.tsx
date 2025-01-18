import SectionWrapper from "@/components/Layouts/section-wrapper";
import BannerCourse from "@/components/views/admin/courses/banner-course";
import BasicCourseForm from "@/components/views/admin/courses/basic/basic-course-form";
import NavigationCourse from "@/components/views/admin/courses/navigation-course";
import PublishComponent from "@/components/views/admin/courses/publish-component";
import { db } from "@/lib/db";
import { Course } from "@/types/model";
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
    include: {
      curriculum: {
        include: {
          module: true,
          exercise: true,
        },
      },
    },
  });

  const category = await db.category.findMany();

  if (!course) {
    return redirect("/error");
  }

  if (course.curriculum === null) {
    course.curriculum = {
      id: "",
      module: [],
      exercise: [],
      courseId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastPosition: 0,
    };
  }

  const { complatedField, totalField, complated } = requiredFieldCourse(
    course as unknown as Course
  );

  return (
    <SectionWrapper isScroll={true} isPadding={false}>
      <BannerCourse
        complatedField={complatedField}
        totalField={totalField}
        isPublish={course.isPublished}
        complated={complated}
        type="course"
      />
      <div className="flex items-center justify-between p-8 pb-0 flex-wrap gap-4">
        <NavigationCourse course={course as unknown as Course} />
        <PublishComponent
          isPublished={course?.isPublished}
          type="course"
          id={course.id}
          isCompleted={complated}
        />
      </div>
      <BasicCourseForm
        course={course as unknown as Course}
        category={category}
      />
    </SectionWrapper>
  );
};

export default BasicCoursePage;
