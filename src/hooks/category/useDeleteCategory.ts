import { instance } from "@/lib/interceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCategory = () => {
  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (data: string[]) => {
      const res = await instance.delete("/category", { data });
      return res.data;
    },
  });

  return { ...mutate, query };
};

export default useDeleteCategory;
