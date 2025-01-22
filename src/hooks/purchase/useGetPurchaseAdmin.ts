import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useGetPurchaseAdmin = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["purchase-all", params],
    queryFn: async () => {
      const res = await instance.get(`/purchase/all?${params}`);

      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (oldData) => oldData,
  });
};

export default useGetPurchaseAdmin;
