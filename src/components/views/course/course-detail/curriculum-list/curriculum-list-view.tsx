"use client";
import { Exercise, ExerciseResult, Module } from "@/types/model";
import React, { Fragment } from "react";
import VideoPlayer from "@/components/fragments/video-player";
import { File } from "lucide-react";

import useProgressCourse from "@/hooks/course/useProgressCourse";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { LoadingButton } from "@/components/ui/loading-button";
import useCertificate from "@/hooks/course/useCertificate";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useCreateRoomExercise from "@/hooks/exercise/useCreateRoomExercise";

interface PropsType {
  list: Module | Exercise;
  params: { courseId: string; curriculumListId: string };
  nextCurriculum: string | undefined;
  progress: number;
  isActive: boolean;
  witchCertificate: boolean;
  exerciseResult: ExerciseResult;
}

const CurriculumListView = ({
  list,
  params,
  nextCurriculum,
  progress,
  isActive,
  witchCertificate,
  exerciseResult,
}: PropsType) => {
  const router = useRouter();
  const [active, setActive] = React.useState(isActive || false);
  const handleDownload = async (url: string, name: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { mutate: mutateProgress, isPending: isPendingProgress } =
    useProgressCourse(params.courseId, setActive);
  const { mutate: mutateCertifcate, isPending: isPendingCertifcate } =
    useCertificate();
  const { mutate: mutateRoom, isPending: isPendingRoom } =
    useCreateRoomExercise();

  return (
    <Fragment>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1  my-6 xl:mx-4">
          {"video" in list ? (
            <VideoPlayer
              src={list?.video || ""}
              onEndded={() => {
                if (!isActive) {
                  mutateProgress({
                    listId: params.curriculumListId,
                    type:
                      "type" in list && list.type === "module"
                        ? "module"
                        : "exercise",
                  });
                }
              }}
            />
          ) : (
            <div className={"aspect-video relative overflow-hidden"}>
              <Image
                src={"image" in list ? list?.image || "" : ""}
                alt={list?.title || ""}
                width={500}
                height={500}
                className="w-full h-full rounded-md"
              />
            </div>
          )}
          {"type" in list && list.type === "exercise" && (
            <div className="rounded-md mt-4 flex-between p-2.5 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-indigo-600 via-indigo-800 to-indigo-900 border">
              <p className="text-sm font-medium text-white">
                Score: {exerciseResult?.score || 0}
              </p>
              <Button
                disabled={isPendingRoom}
                onClick={() =>
                  mutateRoom({
                    exerciseId: params.curriculumListId,
                  })
                }
                className="text-sm"
                variant={"outline"}
              >
                {exerciseResult?.isPassed ? "Details" : "Start Exercise"}
              </Button>
            </div>
          )}

          <div className="mt-6 p-4 rounded-md border bg-white ">
            <h1 className="font-semibold text-xl capitalize">{list?.title}</h1>

            <div
              className="my-4 text-sm"
              dangerouslySetInnerHTML={{ __html: list.description || "" }}
            />

            <div className="space-y-4">
              {"resourse" in list &&
                list?.resourse?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      handleDownload(item?.file as string, item.name as string)
                    }
                    className="flex items-center gap-2 rounded-md p-2 w-full bg-indigo-400/20 font-medium text-sm"
                  >
                    <File size={18} strokeWidth={2} />
                    {item.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className=" border w-full xl:w-[350px] h-fit rounded-md p-6 xl:my-6  text-secondary bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-indigo-600 via-indigo-800 to-indigo-900">
          <div className="w-full">
            <Progress value={progress} />
            <p className="text-sm mt-2 text-white text-center">
              {progress}% Complete
            </p>
          </div>
          {progress === 100 && witchCertificate && (
            <LoadingButton
              variant={"outline"}
              className="text-indigo-700 w-full mt-4"
              onClick={() =>
                mutateCertifcate({
                  courseId: params.courseId,
                })
              }
              disabled={isPendingCertifcate}
              loading={isPendingCertifcate}
            >
              Certificate
            </LoadingButton>
          )}
          <LoadingButton
            variant={"outline"}
            className="text-indigo-700 w-full mt-4"
            onClick={() =>
              list?.proggress &&
              list?.proggress[0] &&
              nextCurriculum !== params.curriculumListId
                ? router.push(`/course/${params.courseId}/${nextCurriculum}`)
                : progress === 100 && nextCurriculum === params.curriculumListId
                ? router.push(`/course/${params.courseId}`)
                : null
            }
            disabled={isPendingProgress || !active}
            loading={isPendingProgress}
          >
            {nextCurriculum === params.curriculumListId ? "Finish" : "Continue"}
          </LoadingButton>
        </div>
      </div>
    </Fragment>
  );
};

export default CurriculumListView;
