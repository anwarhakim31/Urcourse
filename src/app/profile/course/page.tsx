import ProfileCourseView from "@/components/views/profile/profile-course-view";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Purchase } from "@/types/model";
import { getServerSession } from "next-auth";

import React from "react";

const ProfileCoursePage = async () => {
  const session = await getServerSession(authOptions);

  const purchase = await db.purchase.findMany({
    where: {
      userId: session?.user?.id,
      status: "PAID",
    },
    include: {
      course: {
        include: {
          category: true,
          curriculum: {
            include: {
              module: {
                select: {
                  id: true,
                  position: true,
                },
              },
              exercise: {
                select: {
                  id: true,
                  position: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Ambil data progress user
  const progress = await db.proggress.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      module: {
        select: {
          id: true,
        },
      },
      exercise: {
        select: {
          id: true,
        },
      },
    },
  });

  const progressData = purchase.map((item) => {
    const curriculum = item.course.curriculum;

    const totalItems = [
      ...(curriculum?.module || []),
      ...(curriculum?.exercise || []),
    ].sort((a, b) => a?.position - b?.position);
    const totalItemCount = totalItems.length;

    const completedItems = progress.filter((prog) =>
      totalItems.some(
        (currItem) =>
          currItem.id === prog.module?.id || currItem.id === prog.exercise?.id
      )
    );
    const completedItemCount = completedItems.length;

    const progressPercentage = totalItemCount
      ? Math.round((completedItemCount / totalItemCount) * 100)
      : 0;

    return {
      courseId: item.course.id,
      percentage: progressPercentage,
      firstCurriculum: totalItems[0].id,
    };
  });

  return (
    <ProfileCourseView
      purchase={purchase as unknown as Purchase[]}
      progressData={
        progressData as unknown as {
          courseId: string;
          percentage: number;
          firstCurriculum: string;
        }[]
      }
    />
  );
};

export default ProfileCoursePage;
