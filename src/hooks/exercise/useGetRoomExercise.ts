import { instance } from "@/lib/interceptor";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import usePassedExercise from "./usePassedExercise";

const useGetRoomExercise = (
  roomId: string,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const { mutate: passedExercise } = usePassedExercise();

  const mutate = useQuery({
    queryKey: ["room-exercise", roomId],
    queryFn: async () => {
      const res = await instance.get(`/exercise?roomId=${roomId}`);

      if (res.status !== 200) router.replace("/error");

      if (res?.data?.data?.exerciseResult?.isPassed) {
        router.replace(`/exercise/${roomId}/result`);
      }

      if (res?.data?.data?.exerciseResult?.score) {
        setScore(res.data.data.exerciseResult.score);
      }

      if (!timeRemaining) {
        setCurrentQuestion(res.data.data.currentQuestions);
      }

      const expiredDate = new Date(
        res.data.data.exerciseResult.timeRemaining * 1000
      );
      const now = new Date();
      const timeRemainingMs = expiredDate.getTime() - now.getTime();

      if (!res.data.data.exerciseResult.isPassed && timeRemainingMs > 0) {
        startCountdown(timeRemainingMs);
      } else {
        if (!res.data.data.exerciseResult.isPassed) {
          passedExercise({ roomId });
        }

        setTimeRemaining("00:00:00");
      }

      return res.data;
    },
    staleTime: 5 * 1000,
    placeholderData: (oldData) => oldData,
  });

  const startCountdown = (timeRemainingMs: number) => {
    const remaining = Math.floor(timeRemainingMs / 1000);
    const hours = Math.floor((remaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remaining % (60 * 60)) / 60);
    const seconds = remaining % 60;

    setTimeRemaining(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );

    const interval = setInterval(() => {
      const remaining = Math.floor(timeRemainingMs / 1000);
      const hours = Math.floor((remaining % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((remaining % (60 * 60)) / 60);
      const seconds = remaining % 60;

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );

      if (timeRemainingMs <= 0) {
        setTimeRemaining("00:00:00");
        clearInterval(interval);
      } else {
        timeRemainingMs -= 1000;
      }
    }, 1000);
  };

  return { ...mutate, timeRemaining, currentQuestion, setCurrentQuestion };
};

export default useGetRoomExercise;
