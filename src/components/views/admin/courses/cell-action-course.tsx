"use client";
import { Course } from "@/types/model";
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
import Link from "next/link";
import useDeleteCourse from "@/hooks/course/useDeleteCourse";

interface CellActionProps {
  data: Course;
}

const CellActionCourse: React.FC<CellActionProps> = ({ data }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { mutate, isPending } = useDeleteCourse();

  const query = useQueryClient();

  const onConfirm = () => {
    mutate([data.id as string], {
      onSuccess: () => {
        setIsDeleting(false);
        query.invalidateQueries({ queryKey: ["course"] });
        toast.success("Successfully deleted course");
      },
      onError: (err: Error) => {
        ResponseErrorAxios(err);
      },
    });
  };

  return (
    <Fragment>
      <ModalDelete
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={onConfirm}
        loading={isPending}
        desc={`Are you sure you want to delete ${data?.title}?`}
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
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/admin/course/${data.id}/basic`}
              className="w-full h-full"
            >
              Edit
            </Link>
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

export default CellActionCourse;
