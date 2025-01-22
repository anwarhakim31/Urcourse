import { instance } from "@/lib/interceptor";
import { useMutation } from "@tanstack/react-query";

const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: {
      oldPassword: string;
      newPassword: string;
      confPassword: string;
    }) => {
      const res = await instance.patch("/auth/change-password", data);
      return res.data;
    },
  });
};

export default useChangePassword;
