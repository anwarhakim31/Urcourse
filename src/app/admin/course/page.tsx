"use client";
import { ModalDelete } from "@/components/fragments/modal-delete";
import TableFragment from "@/components/fragments/table";
import TablePagination from "@/components/fragments/table-pagination";
import TableSkeleton from "@/components/fragments/table-skeleton";
import SectionWrapper from "@/components/Layouts/section-wrapper";
import InputSearch from "@/components/ui/input-search";
import { columns } from "@/components/views/admin/courses/column-course";
import { ModalAddCourse } from "@/components/views/admin/courses/modal-add-course";
import useDataTableCourse from "@/hooks/course/useDataTableCourse";
import useDeleteCourse from "@/hooks/course/useDeleteCourse";
import useGetCourse from "@/hooks/course/useGetCourse";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const CoursePage = () => {
  const searchParams = useSearchParams();
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const { data, isLoading } = useGetCourse(searchParams);
  const { mutate, query, isPending } = useDeleteCourse();

  const { table, rowSelection } = useDataTableCourse({
    columns,
    data: data?.courses || [],
    paging: data?.paging,
  });

  return (
    <SectionWrapper isScroll={true}>
      <h1 className="text-2xl font-semibold text-slate-700">Course</h1>
      <p className="text-sm text-slate-500">
        Manage all the courses available on your platform here
      </p>
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap my-4 gap-4 w-full">
        <InputSearch placeholder="Search category name..." />
        <div className="flex items-center gap-2 ml-auto">
          {rowSelection && Object.keys(rowSelection).length > 0 && (
            <button
              type="button"
              onClick={() => setIsDeleting(true)}
              aria-label="delete"
              className="border rounded-md bg-white text-red-500 hover:text-white hover:bg-red-500 transition-all duration-300 ease-in-out p-2"
            >
              <Trash size={18} strokeWidth={1.5} />
            </button>
          )}
          <ModalAddCourse />
        </div>
      </div>
      {!isLoading ? (
        <>
          <TableFragment colSpan={15} table={table} />
          <TablePagination pagination={data?.paging} table={table} />
        </>
      ) : (
        <TableSkeleton column={20} table={table} py="py-3" />
      )}
      <ModalDelete
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() =>
          mutate(Object.keys(rowSelection), {
            onSuccess: () => {
              query.invalidateQueries({ queryKey: ["course"] });
              setIsDeleting(false);
              table.resetRowSelection();
              toast.success("Category deleted successfully");
            },
            onError: (err) => {
              ResponseErrorAxios(err);
            },
          })
        }
        loading={isPending}
        desc={`Dengan menghapus ${
          Object.values(rowSelection).length
        } gejala ini, semua data gejala yang berkaitan dengan gejala ini akan terhapus. Apakah anda yakin?`}
      />
    </SectionWrapper>
  );
};

export default CoursePage;
