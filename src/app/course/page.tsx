import Header from "@/components/fragments/header";
import CourseView from "@/components/views/course/course-view";
import { getCategory } from "@/lib/api-service";
import React, { Fragment } from "react";

const CourseListPage = async () => {
  const category = await getCategory();

  return (
    <Fragment>
      <Header />
      <CourseView category={category?.data?.category || []} />
    </Fragment>
  );
};

export default CourseListPage;
