import CourseCurriculumList from "@/components/fragments/course-curriculum-list";
import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import { getCurriculum } from "@/lib/api-service";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Course } from "@/types/model";
import { getServerSession } from "next-auth";

import React, { Fragment } from "react";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  return {
    title: course?.title,
    description:
      "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
    openGraph: {
      title: course?.title,
      description:
        "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
      type: "website",
      locale: "id_ID",
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
      siteName: "Urcourse",
    },
  };
}

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
          <div className="lg:sticky top-[58px] mt-6 lg:w-[350px]  h-fit   overflow-hidden border order-2 lg:order-1 rounded-md lg:rounded-bl-md lg:rounded-br-md">
            <CourseCurriculumList
              course={course as unknown as Course}
              courseId={params.courseId}
              list={curriculumList}
            />
          </div>
          <section className="w-full  order-1 lg:order-2 ">{children}</section>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default layout;
