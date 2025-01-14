import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useGetStatusTransaction = (invoice: string) => {
  const router = useRouter();
  return useQuery({
    queryKey: ["pooling", invoice],
    queryFn: async () => {
      const res = await instance.get("/transaction/status?invoice=" + invoice);

      if (res.data.data.status === "PAID") {
        return router.replace(`/payment/${invoice}/success`);
      } else if (res.data.data.status === "FAILED") {
        return router.refresh();
      }

      return res.data;
    },
    staleTime: 0,

    refetchInterval: (query) => {
      return query?.state?.data?.data?.status === "PENDING" ? 5000 : false;
    },
    placeholderData: (oldData) => oldData,
  });
};

export default useGetStatusTransaction;
