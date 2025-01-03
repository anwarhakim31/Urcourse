import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await instance.get(`/category?${params}`);

      return res.data;
    },
  });
};

export default useGetCategory;
