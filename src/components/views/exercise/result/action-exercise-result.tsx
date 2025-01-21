"use client";
import { Button } from "@/components/ui/button";
import useProgressCourse from "@/hooks/course/useProgressCourse";
import { useRouter } from "next/navigation";
import React from "react";

const ActionExerciseResult = ({
  courseId,
  listId,
  isPassed,
}: {
  courseId: string;
  listId: string;
  isPassed: boolean;
}) => {
  const router = useRouter();
  const { mutate } = useProgressCourse(courseId);

  console.log(isPassed);

  return (
    <Button
      className="w-full mt-6"
      onClick={() => {
        if (!isPassed) mutate({ listId: listId, type: "exercise" });
        router.replace(`/course/${courseId}/${listId}`);
      }}
    >
      Continue
    </Button>
  );
};

export default ActionExerciseResult;
