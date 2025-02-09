import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Course } from "@/types/model";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateModule = (id: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: Course) => {
      const res = await instance.post(`/courses/${id}/curriculum/module`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Module created successfully");

      router.push("/admin/course/" + id + "/curriculum");
      router.refresh();
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useCreateModule;
