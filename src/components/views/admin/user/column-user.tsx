"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/model";

import CellActionUser from "./cell-action-user";
import Image from "next/image";
import { splitFullName } from "@/utils/helpers";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => (
      <figure className="w-8 h-8 rounded-full bg-slate-200 flex-center overflow-hidden">
        {row?.original?.photo ? (
          <Image
            src={row.original?.photo}
            width={50}
            height={50}
            alt={row.getValue("fullname")}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <figcaption className="w-full h-full flex-center bg-indigo-700">
            <span className="text-sm font-semibold text-white">
              {splitFullName(row.original?.fullname || "")}
            </span>
          </figcaption>
        )}
      </figure>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: "Fullname",
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableHiding: false,
  },
  {
    id: "Action",
    cell: ({ row }) => <CellActionUser data={row.original} />,
    enableHiding: false,
  },
];
