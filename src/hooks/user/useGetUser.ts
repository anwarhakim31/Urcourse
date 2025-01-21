import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useGetUser = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["user", params],
    queryFn: async () => {
      const res = await instance.get(`/user?${params}`);

      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (oldData) => oldData,
  });
};

export default useGetUser;
