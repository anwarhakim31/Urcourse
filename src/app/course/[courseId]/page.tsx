import CoruseDetailView from "@/components/views/course/course-detail/course-detail-view";
import { getCurriculum } from "@/lib/api-service";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Course } from "@/types/model";
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

  return (
    <CoruseDetailView
      course={course as Course}
      isPaid={isPaid ? true : false}
      firstCurriculumId={curriculumList[0].id as string}
    />
  );
};

export default DetailPage;
