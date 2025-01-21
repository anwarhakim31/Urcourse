import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import usePassedExercise from "./usePassedExercise";
import { useRouter } from "next/navigation";

interface ResultAnswerType {
  isCorrect: boolean;
  score: number;
  correctAnswer: string[];
  wrongAnswer: string[];
  roomId: string;
}

const useSubmitAnswer = (
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>,
  currentQuestion: number,
  totalQuestions: number,
  roomId: string,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [resultAnswer, setResultAnswer] =
    React.useState<ResultAnswerType | null>(null);

  const { mutate: passedExercise } = usePassedExercise();

  const router = useRouter();

  const mutate = useMutation({
    mutationFn: async (data: {
      roomId: string;
      answerId: string;
      questionId: string;
    }) => {
      const res = await instance.post("/exercise/answer", data);

      return res.data;
    },
    onSuccess: (response) => {
      setResultAnswer(response.data);
      setIsLoading(true);

      setTimeout(() => {
        setResultAnswer(null);
        setScore(response.data.score);

        if (currentQuestion < totalQuestions - 1) {
          setIsLoading(false);
          setCurrentQuestion(currentQuestion + 1);
        } else {
          passedExercise({ roomId });
          router.replace(`/exercise/${roomId}/result`);
        }
      }, 3000);
    },
    onError: (error) => {
      return ResponseErrorAxios(error);
    },
  });

  return { ...mutate, resultAnswer, isLoading };
};

export default useSubmitAnswer;
