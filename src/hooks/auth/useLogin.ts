import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const useLogin = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackurl = searchParams?.get("callbackUrl");

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      setError(null);
      const res = await signIn("credentials", {
        ...data,

        redirect: false,
      });

      if (res?.ok) {
        const session = await getSession();

        console.log(session);

        const path = session?.user?.isAdmin
          ? callbackurl
            ? callbackurl
            : "/admin/dashboard"
          : "/";

        router.push(path, { scroll: false });
      } else {
        setLoading(false);
        setError("Email atau Password salah");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(error as string);
    }
  };

  return { handleLogin, error, loading };
};

export default useLogin;
