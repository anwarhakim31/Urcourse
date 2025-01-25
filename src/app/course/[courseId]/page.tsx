import CoruseDetailView from "@/components/views/course/course-detail/course-detail-view";
import { getCurriculum } from "@/lib/api-service";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Course, Reviews } from "@/types/model";

import { getServerSession } from "next-auth";

const DetailPage = async ({ params }: { params: { courseId: string } }) => {
  const session = await getServerSession(authOptions);

  const isPaid = await db.purchase.findFirst({
    where: {
      userId: session?.user?.id,
      courseId: params.courseId,
      status: "PAID",
    },
  });

  const { course, curriculumList } = await getCurriculum(params.courseId);

  const isReviewed = await db.rating.findFirst({
    where: {
      userId: session?.user?.id,
      courseId: params.courseId,
    },
  });

  const reviews = await db.rating.findMany({
    where: {
      courseId: params.courseId,
    },
    include: {
      user: true,
    },
  });

  return (
    <CoruseDetailView
      course={course as unknown as Course}
      isPaid={isPaid ? true : false}
      firstCurriculumId={curriculumList[0].id as string}
      isReviewed={!!isReviewed}
      reviews={reviews as unknown as Reviews[]}
    />
  );
};

export default DetailPage;
