"use client";
import { User } from "@/types/model";
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

import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import { ResponseErrorAxios } from "@/lib/response-error";
import { ModalDelete } from "@/components/fragments/modal-delete";
import { ModalEditUser } from "./modal-edit-user";
import useDeleteUser from "@/hooks/user/useDeleteUser";

interface CellActionProps {
  data: User;
}

const CellActionUser: React.FC<CellActionProps> = ({ data }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { mutate, isPending } = useDeleteUser();

  const query = useQueryClient();

  const onConfirm = () => {
    mutate([data.id as string], {
      onSuccess: () => {
        setIsDeleting(false);
        query.invalidateQueries({ queryKey: ["user"] });
        toast.success("Deleted User successfully");
      },
      onError: (err: Error) => {
        ResponseErrorAxios(err);
      },
    });
  };

  return (
    <Fragment>
      <ModalEditUser
        id={data.id}
        open={isEditing}
        setOpen={setIsEditing}
        data={data}
      />
      <ModalDelete
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={onConfirm}
        loading={isPending}
        desc={`Are you sure you want to delete ${data?.fullname}?`}
      />
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
            onClick={() => setIsEditing(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleting(true)}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};

export default CellActionUser;
