import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCreateTransaction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: {
      purchaseId: string;
      paymentType: string;
      paymentName: string;
    }) => {
      const res = await instance.post("/transaction", data);
      return res.data;
    },

    onSuccess: (res) => {
      if (res) {
        router.push(`/payment/${res.data.id}`);
      }
    },

    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useCreateTransaction;
