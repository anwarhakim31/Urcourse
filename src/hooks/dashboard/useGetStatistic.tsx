import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useGetStatistic = () => {
  return useQuery({
    queryKey: ["statistic"],
    queryFn: async () => {
      const res = await instance.get(`/statistic`);

      return res.data.data;
    },
    gcTime: 0,
    staleTime: 0,
  });
};

export default useGetStatistic;
