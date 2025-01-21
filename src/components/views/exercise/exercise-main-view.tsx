"use client";

import Loader from "@/components/fragments/loader";
import useGetRoomExercise from "@/hooks/exercise/useGetRoomExercise";
import useSubmitAnswer from "@/hooks/exercise/useSubmitAnswer";
import { cn } from "@/lib/utils";
import { Answer } from "@/types/model";
import { Clock } from "lucide-react";
import Image from "next/image";

import React from "react";

const ExerciseMainPage = ({ roomId }: { roomId: string }) => {
  const [score, setScore] = React.useState(0);
  const {
    data,
    isPending,
    timeRemaining,
    currentQuestion,
    setCurrentQuestion,
  } = useGetRoomExercise(roomId, setScore);
  const [effect, setEffect] = React.useState(true);

  const { questions, exerciseResult } = React.useMemo(() => {
    return data?.data || {};
  }, [data]);

  React.useEffect(() => {
    if (!isPending) {
      const timeout = setTimeout(() => {
        setEffect(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isPending]);

  const {
    mutate: submitAnswer,
    isPending: isPendingSubmit,
    isLoading: isLoadingSubmit,
    resultAnswer,
  } = useSubmitAnswer(
    setCurrentQuestion,
    currentQuestion,
    exerciseResult?.totalQuestions,
    roomId,
    setScore
  );

  return (
    <main className="h-screen w-full relative  flex-center overflow-hidden flex-col">
      {isPending ? (
        <div className="flex-center flex-col">
          <Loader />
          <span className="text-base mt-4  font-medium">Loading Exercise</span>
        </div>
      ) : exerciseResult?.isPassed ? null : (
        <div className="flex flex-col h-full w-full">
          <div className="relative h-[50%] w-full bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-500 flex rounded-br-3xl rounded-bl-3xl flex-center">
            <div className="flex-between absolute w-full top-4 left-0 px-4">
              <h3 className="text-white text-xl font-bold">Score : {score}</h3>
              <div className="flex-center gap-2 rounded-md bg-white/50 px-4 py-1">
                <Clock size={20} color="white" />
                <span className="text-white">{timeRemaining}</span>
              </div>
            </div>
            <div
              className={cn(
                "relative bg-black/70 w-full md:w-[80%] mt-6 h-fit p-4 md:p-6 rounded-md mx-4 transition-all ease-linear duration-300",
                effect ? "scale-75 opacity-0" : "scale-100 opacity-100"
              )}
            >
              <div className="absolute top-[-12px] bg-black left-1/2 outline-1 outline outline-offset-1 outline-indigo-500 -translate-x-1/2 w-fit h-6 flex-center px-4 rounded-full">
                <p className="text-sm font-medium text-white">
                  {currentQuestion + 1}/{exerciseResult?.totalQuestions}
                </p>
              </div>
              <div className="max-h-[200px]  overflow-auto flex items-center flex-col lg:flex-row">
                {questions?.[currentQuestion]?.image && (
                  <div className="aspect-video  max-h-[250px] ">
                    <Image
                      src={questions[currentQuestion]?.image}
                      alt="qr"
                      width={300}
                      height={300}
                      priority
                      className="w-full h-full"
                    />
                  </div>
                )}
                <div
                  className="text-white text-base md:text-lg flex-center w-full font-bold"
                  dangerouslySetInnerHTML={{
                    __html: questions[currentQuestion]?.text,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="h-[50%]  flex-center px-4 w-full overflow-hidden">
            <div className="flex w-full flex-col lg:flex-row gap-4 max-h-[250px] p-4 overflow-auto">
              {questions[currentQuestion]?.answers.map(
                (answer: Answer, i: number) => (
                  <button
                    key={answer.id}
                    disabled={isPendingSubmit || isLoadingSubmit}
                    onClick={() =>
                      submitAnswer({
                        roomId,
                        answerId: answer?.id || "",
                        questionId: questions[currentQuestion]?.id,
                      })
                    }
                    className={cn(
                      "border border-indigo-700 font-medium rounded-md p-2.5 flex-1 text-sm lg:text-base xl:max-w-[500px] hover:text-indigo-700 border-b-2 transition-all ease-linear ",
                      effect ? "scale-75 opacity-0" : "scale-100 opacity-100",
                      `duration-${i * 100}`,
                      resultAnswer?.isCorrect &&
                        resultAnswer?.correctAnswer?.includes(
                          answer?.id || ""
                        ) &&
                        "bg-green-500 text-white border-green-700 animate-correct hover:text-white",
                      !resultAnswer?.isCorrect &&
                        resultAnswer?.wrongAnswer?.includes(answer?.id || "") &&
                        "bg-red-500 text-white border-red-700 animate-incorrect  hover:text-white",
                      !resultAnswer?.isCorrect &&
                        resultAnswer?.correctAnswer?.some(
                          (id: string) => id === answer?.id
                        ) &&
                        "bg-green-500 text-white border-green-700  hover:text-white"
                    )}
                  >
                    {answer.text}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={cn(
          "fixed p-2 w-full  flex-center text-white transition-all ease-linear duration-300",
          resultAnswer?.isCorrect ? "bg-green-500" : "bg-red-500 ",
          resultAnswer ? "bottom-0" : "bottom-[-100%]"
        )}
      >
        <h3 className="font-bold text-lg lg:text-xl">
          {resultAnswer?.isCorrect ? "Correct" : "Wrong"}
        </h3>
      </div>
    </main>
  );
};

export default ExerciseMainPage;
