import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const useLogin = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const url = React.useMemo(() => {
    const callbackUrl = searchParams.get("callbackUrl");
    return callbackUrl ? callbackUrl : "/";
  }, [searchParams]);

  const Login = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      setError(null);
      const res = await signIn("credentials", {
        ...data,
        callbackUrl: url,
        redirect: false,
      });
      if (res?.ok) {
        router.push(url);
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

  return { Login, error, loading };
};

export default useLogin;
