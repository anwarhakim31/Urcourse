import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useGetPurchase = (purchaseId: string) => {
  return useQuery({
    queryKey: ["purchase", purchaseId],
    queryFn: async () => {
      try {
        const res = await instance.get("/purchase?purchaseId=" + purchaseId);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 0,

    refetchInterval: (query) => {
      return query?.state?.data?.data?.status === "PENDING" ? 5000 : false;
    },
    placeholderData: (oldData) => oldData,
  });
};

export default useGetPurchase;
