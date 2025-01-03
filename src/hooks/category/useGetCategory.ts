import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["category", params],
    queryFn: async () => {
      const res = await instance.get(`/category?${params}`);

      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (oldData) => oldData,
  });
};

export default useGetCategory;
