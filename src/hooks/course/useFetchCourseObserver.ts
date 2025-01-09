import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";

const useFetchCourseObserver = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["course", params],
    queryFn: async () => {
      const res = await instance.get(`/courses/observer?${params}`);

      return res.data.data;
    },
    staleTime: 0,
    placeholderData: (oldData) => oldData,
  });
};

export default useFetchCourseObserver;
