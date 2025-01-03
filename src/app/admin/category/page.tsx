"use client";
import { ModalDelete } from "@/components/fragments/modal-delete";
import TableFragment from "@/components/fragments/table";
import TablePagination from "@/components/fragments/table-pagination";
import TableSkeleton from "@/components/fragments/table-skeleton";
import SectionWrapper from "@/components/Layouts/section-wrapper";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/ui/input-search";
import { columns } from "@/components/views/admin/category/column-category";
import { ModalFormCategory } from "@/components/views/admin/category/modal-form-category";
import useDataTableCategory from "@/hooks/category/useDataTableCategory";
import useDeleteCategory from "@/hooks/category/useDeleteCategory";
import useGetCategory from "@/hooks/category/useGetCategory";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const [isAdd, setIsAdd] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const { data, isLoading } = useGetCategory(searchParams);

  const { table, rowSelection } = useDataTableCategory({
    columns,
    data: data?.category || [],
    paging: data?.paging || { totalPage: 0 },
  });

  const { mutate, isPending, query } = useDeleteCategory();

  return (
    <SectionWrapper>
      <h1 className="text-2xl font-semibold text-slate-700">Category</h1>
      <p className="text-sm text-slate-500">
        Manage all the category for your course
      </p>
      <div className="flex items-center justify-between my-4">
        <InputSearch placeholder="Search category name..." />
        <div className="flex items-center gap-2">
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
          <Button type="button" onClick={() => setIsAdd(true)} aria-label="add">
            Add Category
          </Button>
        </div>
      </div>

      {!isLoading ? (
        <>
          <TableFragment colSpan={15} table={table} />
          <TablePagination pagination={data?.paging} table={table} />
        </>
      ) : (
        <TableSkeleton column={5} table={table} />
      )}
      <ModalFormCategory setOpen={setIsAdd} open={isAdd} />
      <ModalDelete
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() =>
          mutate(Object.keys(rowSelection), {
            onSuccess: () => {
              query.invalidateQueries({ queryKey: ["category"] });
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

export default CategoryPage;
