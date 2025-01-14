import { instance } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const useGetStatusTransaction = (invoice: string) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = React.useState("");

  const mutate = useQuery({
    queryKey: ["pooling", invoice],
    queryFn: async () => {
      try {
        const res = await instance.get(
          "/transaction/status?invoice=" + invoice
        );

        if (res.data.data.status === "PAID") {
          return router.replace(`/payment/${invoice}/success`);
        } else if (res.data.data.status === "FAILED") {
          return router.refresh();
        }

        const paymentExpiredDate = new Date(res.data.data.expired);
        const now = new Date();
        const timeRemainingMs = paymentExpiredDate.getTime() - now.getTime();

        if (timeRemainingMs > 0) {
          startCountdown(timeRemainingMs);
        } else {
          setTimeRemaining("00:00:00");
        }

        return res.data;
      } catch (error) {
        router.replace("/error");
        throw error;
      }
    },
    staleTime: 0,

    refetchInterval: (query) => {
      return query?.state?.data?.data?.status === "PENDING" ? 5000 : false;
    },
    placeholderData: (oldData) => oldData,
  });

  const startCountdown = (timeRemainingMs: number) => {
    const remaining = Math.floor(timeRemainingMs / 1000);
    const hours = Math.floor((remaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remaining % (60 * 60)) / 60);
    const seconds = remaining % 60;

    setTimeRemaining(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );

    const interval = setInterval(() => {
      const remaining = Math.floor(timeRemainingMs / 1000);
      const hours = Math.floor((remaining % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((remaining % (60 * 60)) / 60);
      const seconds = remaining % 60;

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );

      if (timeRemainingMs <= 0) {
        setTimeRemaining("00:00:00");
        clearInterval(interval);
      } else {
        timeRemainingMs -= 1000;
      }
    }, 1000);
  };

  return { ...mutate, timeRemaining };
};

export default useGetStatusTransaction;
