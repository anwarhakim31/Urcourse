"use client";
import TableFragment from "@/components/fragments/table";
import SectionWrapper from "@/components/Layouts/section-wrapper";
import { columns } from "@/components/views/admin/category/column-category";
import { ModalFormCategory } from "@/components/views/admin/category/modal-form-category";
import useDataTableCategory from "@/hooks/category/useDataTableCategory";
import React from "react";

const CategoryPage = () => {
  const { table } = useDataTableCategory({
    columns,
    data: [],
    paging: { totalPage: 0 },
  });

  return (
    <SectionWrapper>
      <h1 className="text-2xl font-semibold text-slate-700">Category</h1>
      <p className="text-sm text-slate-500">
        Manage all the category for your course
      </p>
      <div className="flex items-center justify-between my-4">
        <ModalFormCategory />
      </div>
      <TableFragment colSpan={5} table={table} />
    </SectionWrapper>
  );
};

export default CategoryPage;
