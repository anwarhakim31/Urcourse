"use client";
import React from "react";
import ProfileCourseCard from "./profile-course-card";
import { Course, Purchase } from "@/types/model";

const ProfileCourseView = ({
  purchase,
  progressData,
}: {
  purchase: Purchase[];
  progressData: {
    courseId: string;
    percentage: number;
    firstCurriculum: string;
  }[];
}) => {
  return (
    <div className="p-6">
      <h1 className=" text-slate-800 mb-4 font-semibold text-lg">My Course</h1>
      <div className=" grid grid-cols-2 xl:grid-cols-3 gap-6">
        {purchase?.length > 0 ? (
          purchase?.map((item) => (
            <ProfileCourseCard
              key={item.id}
              item={item?.course as Course}
              progressData={
                progressData.filter((i) => i.courseId === item?.course?.id)[0]
              }
            />
          ))
        ) : (
          <div className="mt-8">
            <p className="text-slate-600">You have not purchased any course</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCourseView;
