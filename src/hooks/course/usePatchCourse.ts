import { instance } from "@/lib/interceptor";
import { Course } from "@/types/model";
import { useMutation } from "@tanstack/react-query";

const usePatchCourse = (id: string) => {
  return useMutation({
    mutationFn: async (data: Course) => {
      const res = await instance.patch("/courses?id=" + id, data);
      return res.data;
    },
  });
};

export default usePatchCourse;
