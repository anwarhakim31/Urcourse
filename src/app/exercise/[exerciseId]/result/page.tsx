import ActionExerciseResult from "@/components/views/exercise/result/action-exercise-result";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { CheckCircle2, Send, X } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { exerciseId: string } }) => {
  const session = await getServerSession(authOptions);

  const exerciseResult = await db.exerciseResult.findUnique({
    where: {
      id: params.exerciseId,
      userId: session?.user?.id,
    },
    include: {
      exercise: {
        include: {
          curriculum: true,
        },
      },
    },
  });

  if (!exerciseResult) {
    return redirect("/");
  }

  // if (!exerciseResult.isPassed) {
  //   return redirect(`/exercise/${params.exerciseId}`);
  // }

  return (
    <main className="w-full h-screen flex-center">
      <div className="flex flex-col md:flex-row">
        <div className="rounded-lg bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-400 p-6 flex-center flex-col">
          <h3 className="font-semibold text-xl mb-4 text-white">
            Your Result!
          </h3>
          <div className="flex-center w-36 h-36  bg-gradient-to-b from-indigo-700 to-indigo-600 rounded-full">
            <h1 className="font-semibold text-7xl text-white">
              {exerciseResult.score}
            </h1>
          </div>
          <h5 className="mt-4 text-white font-medium">Congratulation</h5>
          <p className="mt-2 text-white">
            You have passed {exerciseResult.exercise.title}
          </p>
        </div>
        <div className="bg-white rounded-tr-lg rounded-br-lg p-6 shadow-lg flex-center flex-col  gap-4">
          <div className="bg-slate-100 p-2 rounded-full flex-between w-[225px]">
            <div className="flex-center gap-2">
              <CheckCircle2 size={16} strokeWidth={1.5} />
              <p className="font-semibold text-emerald-600 text-sm">Correct</p>
            </div>
            <p className="text-sm"> {exerciseResult.correctAnswers}</p>
          </div>
          <div className="bg-slate-100 p-2 rounded-full flex-between w-[225px]">
            <div className="flex-center gap-2">
              <X size={16} strokeWidth={1.5} />
              <p className="font-semibold text-red-600 text-sm">Incorrect</p>
            </div>
            <p className="text-sm">
              {exerciseResult.totalQuestions - exerciseResult.correctAnswers}
            </p>
          </div>
          <div className="bg-slate-100 p-2 rounded-full flex-between w-[225px]">
            <div className="flex-center gap-2">
              <Send size={16} strokeWidth={1.5} />
              <p className="font-semibold text-blue-600 text-sm">Submited</p>
            </div>
            <p className="text-sm">{`${exerciseResult.updatedAt.getFullYear()}-${
              exerciseResult.updatedAt.getMonth() + 1
            }-${exerciseResult.updatedAt.getDate()}`}</p>
          </div>
          <ActionExerciseResult
            courseId={exerciseResult.exercise.curriculum.courseId}
            listId={exerciseResult.exercise.id}
            isPassed={exerciseResult.isPassed}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
