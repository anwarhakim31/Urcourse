import React from "react";

const CourseCurriculumListPage = ({
  params,
}: {
  params: { courseId: string; listId: string };
}) => {
  console.log(params);
  return <div>CourseCurriculumListPage</div>;
};

export default CourseCurriculumListPage;
