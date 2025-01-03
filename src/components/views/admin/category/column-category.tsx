"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/model";

import CellActionCategory from "./cell-action-category";

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="data-[state=checked]:bg-indigo-700 data-[state=checked]:text-white border-gray-500"
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
        className="data-[state=checked]:bg-indigo-700 data-[state=checked]:text-white border-gray-500"
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Category Name",
    enableHiding: false,
  },
  {
    id: "Action",
    cell: ({ row }) => <CellActionCategory data={row.original} />,
    enableHiding: false,
  },
];
