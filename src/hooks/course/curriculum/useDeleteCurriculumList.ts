import { instance } from "@/lib/interceptor";
import { useMutation } from "@tanstack/react-query";

const useDeleteCurriculumList = (courseId: string) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instance.delete(
        `/courses/${courseId}/curriculum?listId=${id}`
      );
      return res.data;
    },
  });
};

export default useDeleteCurriculumList;
