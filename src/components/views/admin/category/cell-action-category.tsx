"use client";
import { Category } from "@/types/model";
import React, { Fragment } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { ModalDelete } from "@/components/fragments/modal-delete";

// import { toast } from "sonner";

// import { useQueryClient } from "@tanstack/react-query";
import { ModalFormCategory } from "./modal-form-category";

// import useDeleteCategory from "@/hooks/Category/useDeleteCategory";

interface CellActionProps {
  data: Category;
}

const CellActionCategory: React.FC<CellActionProps> = ({ data }) => {
  // const [isEditing, setIsEditing] = React.useState(false);
  // const [isDeleting, setIsDeleting] = React.useState(false);
  // const { mutate, isPending } = useDeleteCategory();

  // const query = useQueryClient();

  // const onConfirm = () => {
  //   mutate(
  //     { selected: [data.id as string] },
  //     {
  //       onSuccess: () => {
  //         setIsDeleting(false);
  //         query.invalidateQueries({ queryKey: ["Category"] });
  //         toast.success("Berhasil menghapus Category");
  //       },
  //       onError: (err: Error) => {
  //         ResponseError(err);
  //       },
  //     }
  //   );
  // };

  return (
    <Fragment>
      <ModalFormCategory data={data} id={data.id} />
      {/* <ModalDelete
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={onConfirm}
        loading={isPending}
        desc={`Apakah anda yakin menghapus Category?`}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            // onClick={() => setIsDeleting(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            // onClick={() => setIsDeleting(true)}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};

export default CellActionCategory;
