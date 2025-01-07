import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const usePublishCurriculum = (id: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const res = await instance.post(
        `/courses/${id}/curriculum/publish?listId=${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Curriculum list published successfully");
      router.refresh();
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default usePublishCurriculum;
