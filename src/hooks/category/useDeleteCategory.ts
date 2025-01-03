import { instance } from "@/lib/interceptor";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (data: string[]) => {
      const res = await instance.delete("/category", { data });
      return res.data;
    },
  });
};

export default useDeleteCategory;
