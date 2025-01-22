import { instance } from "@/lib/interceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePurchase = () => {
  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (data: string[]) => {
      const res = await instance.delete("/purchase", { data });
      return res.data;
    },
  });

  return { ...mutate, query };
};

export default useDeletePurchase;
