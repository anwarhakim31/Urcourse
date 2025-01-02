import { instance } from "@/lib/interceptor";
import { useMutation } from "@tanstack/react-query";

const useCreateCourse = () => {
  return useMutation({
    mutationFn: async (data: { title: string }) => {
      const res = await instance.post("/courses", data);
      return res.data;
    },
  });
};

export default useCreateCourse;
