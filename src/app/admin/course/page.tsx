"use client";
import SectionWrapper from "@/components/Layouts/section-wrapper";
import { ModalAddCourse } from "@/components/views/admin/courses/modal-add-course";

import React from "react";

const CoursePage = () => {
  return (
    <SectionWrapper>
      <h1 className="text-2xl font-semibold text-slate-700">Course</h1>
      <p className="text-sm text-slate-500">
        Manage all the courses available on your platform here
      </p>
      <div className="flex items-center justify-between mt-4">
        <ModalAddCourse />
      </div>
    </SectionWrapper>
  );
};

export default CoursePage;
