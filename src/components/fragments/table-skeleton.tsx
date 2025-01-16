import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Table as TableType } from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = <T,>({
  table,
  py,
  column,
}: {
  table: TableType<T>;
  py?: string;
  column: number;
}) => {
  return (
    <>
      <div className="h-[calc(100vh-300px)] overflow-hidden border rounded-md border-slate-200 bg-white">
        <Table className="overflow-hidden" defaultValue={"true"}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {Array.from({ length: headerGroup.headers.length }).map(
                  (_, i) => {
                    return (
                      <TableHead key={i} className="font-medium text-sm px-4 ">
                        <Skeleton className="h-4 w-full bg-indigo-50" />
                      </TableHead>
                    );
                  }
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: column }).map((_, i) => (
              <Fragment key={i}>
                {table.getHeaderGroups().map((row) => (
                  <TableRow key={row.id}>
                    {Array.from({ length: row.headers.length }).map((_, i) => {
                      return (
                        <TableCell
                          key={i}
                          className={`font-medium text-sm px-4  ${
                            py ? py : "py-6"
                          }`}
                        >
                          <Skeleton className="h-4 w-full bg-indigo-400/20" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 space-x-2 pt-4 md:flex-row">
        <div className=" text-sm text-muted-foreground">
          <Skeleton className="h-8 w-[150px] bg-indigo-400/20 " />
        </div>

        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[200px] bg-indigo-400/20 " />
        </div>

        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[150px] bg-indigo-400/20 " />
        </div>
      </div>
    </>
  );
};

export default TableSkeleton;
