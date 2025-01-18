import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Course } from "@/types/model";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const usePatchExercise = (courseId: string, exerciseId: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: Course) => {
      const res = await instance.patch(
        `/courses/${courseId}/curriculum/exercise?exerciseId=${exerciseId}`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Exercise updated successfully");

      router.push("/admin/course/" + courseId + "/curriculum");
      router.refresh();
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default usePatchExercise;
