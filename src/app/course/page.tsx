import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import CourseView from "@/components/views/course/course-view";
import { getCategory } from "@/lib/api-service";
import { Metadata } from "next";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: "Course List",
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

const CourseListPage = async () => {
  const category = await getCategory();

  return (
    <Fragment>
      <Header />
      <CourseView category={category?.data?.category || []} />
      <Footer />
    </Fragment>
  );
};

export default CourseListPage;
