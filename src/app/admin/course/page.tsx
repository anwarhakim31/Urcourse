"use client";
import TableFragment from "@/components/fragments/table";
import SectionWrapper from "@/components/Layouts/section-wrapper";
import { columns } from "@/components/views/admin/courses/column-course";
import { ModalAddCourse } from "@/components/views/admin/courses/modal-add-course";
import useDataTableCourse from "@/hooks/course/useDataTableCourse";

import React from "react";

const CoursePage = () => {
  const { table } = useDataTableCourse({
    columns,
    data: [],
    paging: { totalPage: 0 },
  });

  return (
    <SectionWrapper>
      <h1 className="text-2xl font-semibold text-slate-700">Course</h1>
      <p className="text-sm text-slate-500">
        Manage all the courses available on your platform here
      </p>
      <div className="flex items-center justify-between my-4">
        <ModalAddCourse />
      </div>
      <TableFragment colSpan={5} table={table} />
    </SectionWrapper>
  );
};

export default CoursePage;
