"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Course } from "@/types/model";

import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white border-white"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        className="data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white border-gray-500"
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    enableHiding: false,
  },

  {
    accessorKey: "Price",
    header: "Price",
    enableHiding: false,
  },
  {
    accessorKey: "isPublished",
    header: "Status",
  },

  {
    id: "Action",
    cell: ({ row }) => (
      <Link href={`/admin/course/${row.original.id}/basic`}>Edit</Link>
    ),
    enableHiding: false,
  },
];
