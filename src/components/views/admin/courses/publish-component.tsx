"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import usePublishCurriculum from "@/hooks/course/curriculum/usePublishCurriculumList";
import useUnpublishCurriculum from "@/hooks/course/curriculum/useUnPublishCurriculumList";
import usePublishCourse from "@/hooks/course/usePublishCourse";
import useUnpublishCourse from "@/hooks/course/useUnpublishCourse";
import { Loader, ZapIcon, ZapOff } from "lucide-react";
import React from "react";

const PublishComponent = ({
  isPublished,
  type,
  isCompleted,
  id,
}: {
  isPublished: boolean;
  type: string;
  isCompleted: boolean;
  id: string;
}) => {
  const { mutate: publishCourse, isPending: isPendingPubCourse } =
    usePublishCourse(id);
  const { mutate: unpublishCourse, isPending: isPendingUnpCourse } =
    useUnpublishCourse(id);

  const { mutate: publishCurriculum, isPending: isPendingPubCur } =
    usePublishCurriculum(id);

  const { mutate: unpublishCurriculum, isPending: isPendingUnpCur } =
    useUnpublishCurriculum(id);

  const handlePublish = async () => {
    if (type === "course") {
      if (isPublished) {
        return unpublishCourse();
      } else {
        return publishCourse();
      }
    } else if (type === "curriculum") {
      if (isPublished) {
        return unpublishCurriculum();
      } else {
        return publishCurriculum();
      }
    }
  };
  const loading =
    isPendingPubCourse ||
    isPendingUnpCourse ||
    isPendingPubCur ||
    isPendingUnpCur;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={handlePublish}
          type="button"
          disabled={loading || !isCompleted}
          className="border rounded-md px-4 py-1.5 hover:bg-indigo-400/30 transition-all ease-in-out duration-300 disabled:cursor-not-allowed hover:border-indigo-700 hover:text-indigo-700"
        >
          {loading ? (
            <Loader size={18} strokeWidth={1.5} />
          ) : isCompleted ? (
            <ZapOff size={18} strokeWidth={1.5} />
          ) : (
            <ZapIcon size={18} strokeWidth={1.5} />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPublished ? "Unpublish" : "Publish"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PublishComponent;
