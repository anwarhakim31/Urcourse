import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

const useReorder = (id: string) => {
  return useMutation({
    mutationFn: async (
      data: { id: string; position: number; type: string; courseId: string }[]
    ) => {
      const res = await instance.patch(
        `/courses/${id}/curriculum/reorder`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Course updated successfully");
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useReorder;
