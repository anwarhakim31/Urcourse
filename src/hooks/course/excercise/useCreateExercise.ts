import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Exercise } from "@/types/model";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateExercise = (id: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: Exercise) => {
      const res = await instance.post(`/courses/${id}/curriculum/exercise`, {
        ...data,
        duration: Number(data.duration),
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Exercise created successfully");

      router.push("/admin/course/" + id + "/curriculum");
      router.refresh();
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useCreateExercise;
