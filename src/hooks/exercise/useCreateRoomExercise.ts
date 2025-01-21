import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCreateRoomExercise = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { exerciseId: string }) => {
      const res = await instance.post("/exercise/", data);

      return res.data;
    },
    onSuccess: (response) => {
      router.push(`/exercise/${response.data.id}`);
    },
    onError: (error) => {
      return ResponseErrorAxios(error);
    },
  });
};

export default useCreateRoomExercise;
