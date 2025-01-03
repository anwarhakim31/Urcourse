import { redirect } from "next/navigation";

const page = ({ params }: { params: { courseId: string } }) => {
  return redirect(`/admin/course/${params.courseId}/basic`);
};

export default page;
