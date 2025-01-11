import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";

const useCreatePurchase = () => {
  return useMutation({
    mutationFn: async (data: { courseId: string }) => {
      const res = await instance.post("/purchase", data);
      return res.data;
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useCreatePurchase;
