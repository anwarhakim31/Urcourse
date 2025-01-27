import { Course, Reviews } from "@/types/model";
import { formatCurrency } from "@/utils/helpers";
import { Gem, Ribbon } from "lucide-react";
import Image from "next/image";
import React from "react";
import CourseDetailAction from "./course-detail-action";
import CourseReview from "./course-review";
import { cn } from "@/lib/utils";

const CoruseDetailView = ({
  course,
  isPaid,
  firstCurriculumId,
  isReviewed,
  reviews,
}: {
  course: Course;
  isPaid: boolean;
  firstCurriculumId: string;
  isReviewed: boolean;
  reviews: Reviews[];
}) => {
  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <div className="flex-1  my-6 xl:mx-4">
        <figure className="aspect-video rounded-md border overflow-hidden relative">
          <Image
            src={course.image || ""}
            alt={course.title}
            fill
            className="object-cover"
          />
        </figure>
        <div className="mt-6 p-4 rounded-md border bg-white">
          <h1 className="font-semibold text-xl capitalize">{course.title}</h1>
          <p className="text-slate-700 text-sm">{course.category?.name}</p>
          <div
            className="my-4 text-sm"
            dangerouslySetInnerHTML={{ __html: course.description || "" }}
          />
          {!isPaid && (
            <p className="mt-2 font-medium">
              {formatCurrency(course.price || 0)}
            </p>
          )}

          <div className="flex item-center mt-4 gap-2">
            <span
              className={cn(
                "w-fit flex items-center gap-2 pointer-events-none border rounded-full font-medium   px-4 py-0.5 text-xs",
                course.level === "Beginner" && "bg-green-100 text-green-500",
                course.level === "Intermediate" &&
                  "bg-yellow-100 text-yellow-500",
                course.level === "Advanced" && "bg-red-100 text-red-500"
              )}
            >
              <Gem
                size={14}
                strokeWidth={1.5}
                className={cn(
                  "text-indigo-700",
                  course.level === "Beginner" && "text-green-500",
                  course.level === "Intermediate" && "text-yellow-500",
                  course.level === "Advanced" && "text-red-500"
                )}
              />
              {course.level}
            </span>
            <span
              className={cn(
                "w-fit flex items-center gap-2 pointer-events-none border rounded-full font-medium bg-orange-100   text-orange-500  px-4 py-0.5 text-xs"
              )}
            >
              <Ribbon
                size={14}
                strokeWidth={1.5}
                className={cn("text-orange-700")}
              />
              Certificate
            </span>
          </div>
        </div>
        <CourseReview
          isPaid={isPaid}
          course={course as Course}
          isReviewed={isReviewed}
          reviews={reviews as Reviews[]}
        />
      </div>
      <CourseDetailAction
        course={course as Course}
        isPaid={isPaid}
        firstCurriculumId={firstCurriculumId}
      />
    </div>
  );
};

export default CoruseDetailView;
