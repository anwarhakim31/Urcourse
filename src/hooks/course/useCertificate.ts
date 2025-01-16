import { instance } from "@/lib/interceptor";
import { useMutation } from "@tanstack/react-query";

const useCertificate = () => {
  return useMutation({
    mutationFn: async (data: { courseId: string }) => {
      const res = await instance.post("/courses/certificate", data, {
        responseType: "blob",
      });
      console.log(res.data);
      return res.data;
    },
    onSuccess: (response) => {
      const blob = new Blob([response], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "certificate-urcourse.pdf"; // File name for download
      link.click(); // Trigger the download
    },
  });
};

export default useCertificate;
