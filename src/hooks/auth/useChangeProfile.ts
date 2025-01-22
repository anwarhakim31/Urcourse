import { instance } from "@/lib/interceptor";
import { useMutation } from "@tanstack/react-query";

const useChangeProfile = () => {
  return useMutation({
    mutationFn: async (data: {
      fullname: string;
      email: string;
      photo?: string;
    }) => {
      const res = await instance.patch("/auth/profile", data);
      return res.data;
    },
  });
};

export default useChangeProfile;
