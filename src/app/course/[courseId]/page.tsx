import CoruseDetailView from "@/components/views/course/course-detail/course-detail-view";
import { db } from "@/lib/db";
import { Course } from "@/types/model";

import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

const DetailPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      category: true,
    },
  });

  if (!course) {
    return redirect("/course");
  }

  const user = await getSession();

  console.log(user);

  return <CoruseDetailView course={course as Course} />;
};

export default DetailPage;
