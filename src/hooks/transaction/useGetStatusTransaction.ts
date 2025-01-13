import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useGetStatusTransaction = (paymentId: string) => {
  const router = useRouter();
  return useQuery({
    queryKey: ["pooling", paymentId],
    queryFn: async () => {
      const res = await instance.get(
        "/transaction/status?paymentId=" + paymentId
      );

      if (res.data.data.status === "PAID") {
        return router.replace(`/payment/${paymentId}/success`);
      } else if (res.data.data.status === "EXPIRED") {
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
