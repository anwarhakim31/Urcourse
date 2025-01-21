import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";

const usePassedExercise = () => {
  return useMutation({
    mutationFn: async (data: { roomId: string }) => {
      const res = await instance.post("/exercise/passed", data);

      return res.data;
    },
    onError: (error) => {
      return ResponseErrorAxios(error);
    },
  });
};

export default usePassedExercise;
