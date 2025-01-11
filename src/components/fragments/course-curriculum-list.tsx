"use client";
import { cn } from "@/lib/utils";
import { BookOpenIcon, NotebookPen, PlayCircle } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface PropsType {
  courseId: string;
  list: {
    id: string;
    type: string;
    title: string;
  }[];
}

const CourseCurriculumList = ({ courseId, list }: PropsType) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="max-h-[calc(100vh-50px)] ">
      <div className="flex-center py-4 bg-white">
        <h3 className="font-medium">What you will learn!</h3>
      </div>
      <div className="scrollbar-none h-fit max-h-[calc(100vh-180px)] overflow-auto">
        {list.map((item) => (
          <button
            key={item.id}
            disabled={pathname === `/course/${courseId}`}
            onClick={() => router.push(`/course/${courseId}/${item.id}`)}
            className={cn(
              "flex relative items-center w-full gap-x-2 border-b text-slate-600 text-sm font-medium pl-6 transition-all hover:text-slate-700 hover:bg-indigo-400/10",
              pathname.includes(item.id) &&
                "bg-indigo-400/20 text-indigo-700 hover:bg-indigo-400/20 hover:text-indigo-700",
              pathname === `/course/${courseId}` && "bg-slate-100"
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              <PlayCircle size={18} strokeWidth={1.5} />
              <span className="text-sm">{item.title}</span>
            </div>

            <div
              className={cn(
                "bg-indigo-700 h-full w-1 ml-auto opacity-0 transition-all duration-200 absolute right-0 top-0",
                pathname.includes(item.id) && "opacity-100"
              )}
            ></div>
          </button>
        ))}
      </div>
      <div className="flex-center gap-2 py-4 bg-white">
        {list.filter((item) => item.type === "module").length > 0 && (
          <p className="flex items-center gap-2 text-xs font-medium bg-indigo-400/20 px-4 py-1 text-indigo-700 rounded-md">
            <BookOpenIcon size={14} />
            <span>
              {list.filter((item) => item.type === "module").length} Module
            </span>
          </p>
        )}
        {list.filter((item) => item.type === "exercise").length > 0 && (
          <p className="flex items-center gap-2 text-xs font-medium bg-indigo-400/20 px-4 py-1 text-indigo-700 rounded-md">
            & <NotebookPen size={14} />
            <span>
              {list.filter((item) => item.type === "exercise").length} Exercise
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCurriculumList;
