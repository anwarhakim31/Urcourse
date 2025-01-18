import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useReorder = (id: string) => {
  return useMutation({
    mutationFn: async (
      data: { id: string; position: number; type: string; courseId: string }[]
    ) => {
      return toast.promise(
        instance
          .patch(`/courses/${id}/curriculum/reorder`, data)
          .then((res) => res.data),
        {
          loading: "Reordering curriculum...",
          success: "Curriculum reordered successfully",
          error: "Failed to update course",
        }
      );
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useReorder;
