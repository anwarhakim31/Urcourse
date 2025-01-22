"use client";
import { ModalDelete } from "@/components/fragments/modal-delete";
import TableFragment from "@/components/fragments/table";
import TablePagination from "@/components/fragments/table-pagination";
import TableSkeleton from "@/components/fragments/table-skeleton";
import SectionWrapper from "@/components/Layouts/section-wrapper";

import InputSearch from "@/components/ui/input-search";

import { columns } from "@/components/views/admin/purchase/column-purchase";

import useDataTablePurchase from "@/hooks/purchase/useDataTablePurchase";
import useDeletePurchase from "@/hooks/purchase/useDeletePurchase";
import useGetPurchaseAdmin from "@/hooks/purchase/useGetPurchaseAdmin";

import { ResponseErrorAxios } from "@/lib/response-error";
import { Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PurchasePage = () => {
  const searchParams = useSearchParams();

  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const { data, isLoading } = useGetPurchaseAdmin(searchParams);

  console.log(data);

  const { table, rowSelection } = useDataTablePurchase({
    columns,
    data: data?.purchases || [],
    paging: data?.paging || { totalPage: 0 },
  });

  const { mutate, isPending, query } = useDeletePurchase();

  return (
    <SectionWrapper>
      <h1 className="text-2xl font-semibold text-slate-700">Purhcase</h1>
      <p className="text-sm text-slate-500">
        Manage all the purchase paid by user
      </p>
      <div className="flex items-center justify-between my-4 gap-4 flex-wrap  md:flex-nowrap">
        <InputSearch placeholder="Search purchase by user email and course name..." />
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
              query.invalidateQueries({ queryKey: ["purchase-all"] });
              setIsDeleting(false);
              table.resetRowSelection();
              toast.success("Purchase deleted successfully");
            },
            onError: (err) => {
              ResponseErrorAxios(err);
            },
          })
        }
        loading={isPending}
        desc={` Are you sure you want to delete ${
          Object.values(rowSelection).length
        } purchase ?`}
      />
    </SectionWrapper>
  );
};

export default PurchasePage;
