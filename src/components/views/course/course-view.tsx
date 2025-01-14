"use client";
import InputSearch from "@/components/ui/input-search";
import useFetchCourseObserver from "@/hooks/course/useFetchCourseObserver";
import { cn } from "@/lib/utils";
import { Category, Course } from "@/types/model";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import CourseCard from "./course-card";
import CourseCardSkeleton from "./course-card-skeleton";
import Image from "next/image";

interface PropsType {
  category: Category[];
}

const CourseView: React.FC<PropsType> = ({ category }) => {
  const searchParams = useSearchParams();
  const [hover, setHover] = useState(false);

  const categoryParams = searchParams.get("category") || "";

  const { data, isError, isLoading } = useFetchCourseObserver(searchParams);

  return (
    <main className="container py-24  bg-[url('/background-top.svg')]  bg-top bg-no-repeat min-h-screen">
      <div className="flex-center">
        <InputSearch
          placeholder="Search course name..."
          className="rounded-full pl-10 border-slate-300"
        />
      </div>
      <div
        className={cn(
          "flex gap-2 items-center   mt-10 pb-1",
          hover ? "overflow-auto" : "overflow-hidden",
          category.length < 8 && "lg:justify-center"
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link
          href={"/course"}
          className={cn(
            "text-sm border rounded-md font-medium   bg-slate-100 px-3 py-1.5 border-slate-300",
            !categoryParams && "border-indigo-700 text-indigo-700"
          )}
        >
          All
        </Link>
        {category.map((item) => (
          <Link
            key={item.id}
            href={`/course?category=${item.id}`}
            className={cn(
              "text-sm border rounded-md font-medium capitalize  bg-indigo-400/20 px-3 py-1.5 border-slate-300",
              categoryParams === item.id && "border-indigo-700 text-indigo-700"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-6">
        {isLoading || isError ? (
          Array.from({ length: 12 }).map((item, i) => (
            <CourseCardSkeleton key={i} />
          ))
        ) : data?.length > 0 ? (
          data.map((item: Course) => <CourseCard key={item.id} item={item} />)
        ) : (
          <div className="flex-center col-span-12 flex-col">
            <Image
              src={"/course-notfound.svg"}
              alt="notfound"
              width={200}
              height={200}
              priority
            />
            <p className="mt-4 font-medium">Course Not Found</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CourseView;
