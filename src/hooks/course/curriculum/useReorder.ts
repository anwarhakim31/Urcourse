import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

const useReorder = () => {
  return useMutation({
    mutationFn: async (
      data: { id: string; position: number; type: string }[]
    ) => {
      const res = await instance.patch("/courses/curriculum/reorder", data);
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
