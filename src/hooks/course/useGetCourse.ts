import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useGetCourse = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["course", params],
    queryFn: async () => {
      const res = await instance.get(`/courses?${params}`);

      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (oldData) => oldData,
  });
};

export default useGetCourse;
