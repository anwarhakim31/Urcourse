import { Progress } from "@/components/ui/progress";
import { Course } from "@/types/model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCourseCard = ({
  item,
  progressData,
}: {
  item: Course;
  progressData: {
    courseId: string;
    percentage: number;
    firstCurriculum: string;
  };
}) => {
  console.log(progressData);

  return (
    <Link href={`/course/${item.id}/${progressData.firstCurriculum}`}>
      <div className="rounded-md  border flex flex-col overflow-hidden bg-white ">
        <div className="flex-1">
          <div className="relative w-full aspect-video">
            <Image
              src={item.image || ""}
              alt={item.title}
              width={500}
              height={500}
              priority
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="p-2.5 pb-4">
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-slate-700 text-sm">{item?.category?.name}</p>
          </div>
          <div className="w-full px-2.5 mb-2.5">
            <Progress value={progressData.percentage} />
            <p className="text-sm mt-2 text-slate-700 text-center">
              {progressData.percentage}% Complete
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCourseCard;
