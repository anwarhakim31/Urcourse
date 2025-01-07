"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Course } from "@/types/model";

import CellActionCourse from "./cell-action-course";

export const columns: ColumnDef<Course>[] = [
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
    accessorKey: "title",
    header: "Title",
    enableHiding: false,
  },

  {
    accessorKey: "Price",
    header: "Price",
    enableHiding: false,
    cell: ({ row }) => (
      <p>{row.getValue("Price") ? row.getValue("Price") : "-"}</p>
    ),
  },
  {
    accessorKey: "Total Curriculum",
    header: () => <p className="text-center">Total Curriculum</p>,
    enableHiding: false,
    cell: ({ row }) => {
      const total =
        row.original?.curriculum && row.original.curriculum.exercise
          ? row.original.curriculum.module.length +
            row.original.curriculum.exercise.length
          : 0;

      return <p className="text-center">{total}</p>;
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
  },

  {
    id: "Action",
    cell: ({ row }) => <CellActionCourse data={row.original} />,
    enableHiding: false,
  },
];
