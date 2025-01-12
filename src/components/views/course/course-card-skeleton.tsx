import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="rounded-md   flex flex-col overflow-hidden border-slate-300">
      <div className="flex-1">
        <div className="relative w-full aspect-video">
          <Skeleton className="w-full h-full"></Skeleton>
        </div>
        <div className="p-2.5 pb-4">
          <Skeleton className="font-medium truncate w-3/4 h-5"></Skeleton>
          <Skeleton className="font-medium truncate w-1/2 h-4 mt-2"></Skeleton>
          <Skeleton className="font-medium truncate w-1/2 h-5 mt-2"></Skeleton>
          <div className="flex justify-between items-center mt-3">
            <Skeleton className=" w-1/4 h-4"></Skeleton>
            <Skeleton className=" w-1/3 h-5"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
