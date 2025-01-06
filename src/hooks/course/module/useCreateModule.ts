import { instance } from "@/lib/interceptor";
import { Course } from "@/types/model";
import { useMutation } from "@tanstack/react-query";

const useCreateModule = (id: string) => {
  return useMutation({
    mutationFn: async (data: Course) => {
      const res = await instance.post(`/courses/${id}/module`, data);
      return res.data;
    },
  });
};

export default useCreateModule;
