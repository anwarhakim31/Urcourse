"use client";
import { cn } from "@/lib/utils";
import { Course } from "@/types/model";
import {
  BookOpenIcon,
  CheckCircle2Icon,
  Lock,
  NotebookPen,
  Pencil,
  PlayCircle,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface PropsType {
  courseId: string;
  list: {
    id: string;
    type: string;
    title: string;
    proggress: {
      id: string;
      moduleId: string | null;
      exerciseId: string | null;
    }[];
  }[];
  course: Course;
}

const CourseCurriculumList = ({ courseId, list, course }: PropsType) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="max-h-[calc(100vh-50px)] ">
      <div className="flex-center py-4 bg-white border-b  ">
        <h3 className="font-medium">
          {pathname === `/course/${courseId}`
            ? "What you will learn!"
            : course?.title}
        </h3>
      </div>
      <div className="scrollbar-none bg-white h-fit max-h-[calc(100vh-225px)] overflow-auto">
        {list.map((item, i) => (
          <button
            key={item.id}
            disabled={
              pathname === `/course/${courseId}` ||
              (i > 0 && list[i - 1].proggress.length === 0)
            }
            onClick={() => router.push(`/course/${courseId}/${item.id}`)}
            className={cn(
              "flex relative items-center w-full gap-x-2 border-b text-slate-600 text-sm  pl-4 transition-all hover:text-slate-700 hover:bg-indigo-400/10",
              pathname.includes(item.id) &&
                "bg-indigo-400/20 text-indigo-700 hover:bg-indigo-400/20 hover:text-indigo-700",

              i > 0 &&
                list[i - 1].proggress.length === 0 &&
                "hover:bg-transparent text-slate-500 hover:text-slate-500",
              pathname === `/course/${courseId}` &&
                "bg-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-600 pointer-events-none",
              pathname !== `/course/${courseId}` &&
                item.proggress.some(
                  (item) => item.moduleId || item.exerciseId
                ) &&
                "text-emerald-500 hover:text-emerald-500 "
            )}
          >
            {(i > 0 && list[i - 1].proggress.length === 0) ||
            pathname === `/course/${courseId}` ? (
              <div className="flex items-center gap-x-2 py-4">
                <Lock size={18} strokeWidth={1.5} />
                <span className="text-sm text-left line-clamp-1">
                  {item.title}
                </span>
              </div>
            ) : item.proggress.some(
                (item) => item.moduleId || item.exerciseId
              ) ? (
              <div className="flex items-center gap-x-2 py-4">
                <CheckCircle2Icon size={18} strokeWidth={1.5} />
                <span className="text-sm text-left line-clamp-1">
                  {item.title}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-x-2 py-4">
                {item.type === "module" ? (
                  <PlayCircle size={18} strokeWidth={1.5} />
                ) : (
                  <Pencil size={16} strokeWidth={1.5} />
                )}
                <span className="text-sm text-left line-clamp-1">
                  {item.title}
                </span>
              </div>
            )}

            <div
              className={cn(
                "bg-indigo-700 h-full w-1 ml-auto opacity-0 transition-all duration-200 absolute right-0 top-0",
                item.proggress.some(
                  (item) => item.moduleId || item.exerciseId
                ) && "bg-emerald-500 ",
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
            <NotebookPen size={14} />
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
