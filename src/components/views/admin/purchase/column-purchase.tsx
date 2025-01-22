"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Purchase } from "@/types/model";

import CellActionPurchase from "../purchase/cell-action-purchase";
import { formatCurrency } from "@/utils/helpers";

export const columns: ColumnDef<Purchase>[] = [
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
    header: "Email User",
    cell: ({ row }) => <span>{row?.original?.user?.email}</span>,
    enableHiding: false,
  },
  {
    header: "Course Name",
    cell: ({ row }) => <span>{row?.original?.course?.title}</span>,
    enableHiding: false,
  },
  {
    header: "Income",
    cell: ({ row }) => <span>{formatCurrency(row?.original?.price || 0)}</span>,
    enableHiding: false,
  },
  {
    id: "Action",
    cell: ({ row }) => <CellActionPurchase data={row.original} />,
    enableHiding: false,
  },
];
