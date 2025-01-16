import CourseCurriculumList from "@/components/fragments/course-curriculum-list";
import Header from "@/components/fragments/header";
import { getCurriculum } from "@/lib/api-service";
import authOptions from "@/lib/authOptions";
import { Course } from "@/types/model";
import { getServerSession } from "next-auth";

import React, { Fragment } from "react";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const session = await getServerSession(authOptions);
  const { curriculumList, course } = await getCurriculum(
    params.courseId,
    session?.user?.id
  );

  return (
    <Fragment>
      <Header />

      <main className="bg-back">
        <div className="container relative w-full flex flex-col lg:flex-row  pt-14 pb-16 gap-4 ">
          <div className="lg:sticky top-[58px] mt-6 lg:w-[350px]  h-fit border  overflow-hidden border-slate-300 order-2 lg:order-1 rounded-md lg:rounded-bl-md lg:rounded-br-md">
            <CourseCurriculumList
              course={course as Course}
              courseId={params.courseId}
              list={curriculumList}
            />
          </div>
          <section className="w-full  order-1 lg:order-2 ">{children}</section>
        </div>
      </main>
    </Fragment>
  );
};

export default layout;
