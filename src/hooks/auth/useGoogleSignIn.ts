import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

const useGoogleSignIn = () => {
  const [loading, setLoading] = React.useState(false);

  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google", {
      redirect: true,
      callbackUrl: callbackUrl,
    });
  };

  return {
    handleGoogleSignIn,
    loading,
  };
};

export default useGoogleSignIn;
