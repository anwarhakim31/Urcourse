import { Course } from "@/types/model";
import { formatCurrency } from "@/utils/helpers";
import { Gem, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import CourseDetailAction from "./course-detail-action";

const CoruseDetailView = ({ course }: { course: Course }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <div className="flex-1  my-6 xl:mx-4">
        <figure className="aspet-video rounded-md border overflow-hidden">
          <Image
            src={course.image || ""}
            alt={course.title}
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </figure>
        <div className="mt-6 p-4 rounded-md border bg-white">
          <h1 className="font-semibold text-xl capitalize">{course.title}</h1>
          <p className="text-slate-700 text-sm">{course.category?.name}</p>
          <div
            className="my-4"
            dangerouslySetInnerHTML={{ __html: course.description || "" }}
          />
          <p className="mt-2 text-indigo-700 font-medium">
            {formatCurrency(course.price || 0)}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="flex items-center gap-2  text-xs">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              0/5
            </span>
            <span className="flex items-center gap-2 pointer-events-none text-indigo-700 border rounded-full font-medium  bg-indigo-100 px-4 py-0.5 text-xs">
              <Gem size={16} strokeWidth={1.5} className="text-indigo-700" />{" "}
              {course.level}
            </span>
          </div>
        </div>
      </div>
      <CourseDetailAction course={course as Course} />
    </div>
  );
};

export default CoruseDetailView;
