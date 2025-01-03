import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table as TableType, flexRender } from "@tanstack/react-table";

const TableFragment = <T,>({
  colSpan,
  table,
}: {
  colSpan?: number;
  table: TableType<T>;
}) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-white text-slate-600">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-medium text-sm px-4 text-slate-500 truncate"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-x-hidden">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${
                  row.getIsSelected() ? "bg-indigo-400/20" : ""
                } h-fit`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      row.getIsSelected()
                        ? "bg-indigo-400/20 px-4 py-1"
                        : "px-4 py-1"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-b-0">
              <TableCell
                colSpan={colSpan}
                className="h-[calc(100vh-345px)] text-center text-sm"
              >
                No data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableFragment;