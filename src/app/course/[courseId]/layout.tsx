import CourseCurriculumList from "@/components/fragments/course-curriculum-list";
import Header from "@/components/fragments/header";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import React, { Fragment } from "react";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    return redirect("/course");
  }

  const curriculum = await db.curriculum.findFirst({
    where: {
      courseId: params.courseId,
    },
    include: {
      module: true,
      exercise: true,
    },
  });

  const curriculumList = [
    ...(curriculum?.module || []),
    ...(curriculum?.exercise || []),
  ].sort((a, b) => a.position - b.position);

  return (
    <Fragment>
      <Header />
      <main className="relative w-full flex flex-col lg:flex-row  pt-14 gap-4 container">
        <div className="lg:sticky top-[58px] mt-6 lg:w-[350px]  h-fit border  overflow-hidden border-slate-300 order-2 lg:order-1 rounded-md lg:rounded-bl-md lg:rounded-br-md">
          <CourseCurriculumList
            courseId={params.courseId}
            list={curriculumList}
          />
        </div>
        <section className="w-full  order-1 lg:order-2 ">{children}</section>
      </main>
    </Fragment>
  );
};

export default layout;
