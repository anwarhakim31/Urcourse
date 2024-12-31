"use client";
import Image from "next/image";
import React, { Fragment } from "react";
// import LoginView from "../views/(auth)/LoginView";
import { usePathname } from "next/navigation";
// import RegisterView from "../views/(auth)/RegisterView";
// import ForgetPasswordView from "../views/(auth)/ForgetPasswordView";
import Link from "next/link";
import LoginView from "../views/auth/login-view";
import RegisterView from "../views/auth/register-view";
import ForgotView from "../views/auth/forgot-view";
import ResetPasswordView from "../views/auth/reset-password-view";

const renderView = (
  pathname: string,
  success: boolean,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  switch (pathname) {
    case "/register":
      return <RegisterView />;
    case "/login":
      return <LoginView />;
    case "/forget-password":
      return !success ? <ForgotView setSuccess={setSuccess} /> : null;
    case "/reset-password":
      return !success ? <ResetPasswordView setSuccess={setSuccess} /> : null;
    default:
      return null;
  }
};

const googleRender = ["/login", "/register"];

const AuthLayout = () => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const pathname = usePathname();

  return (
    <Fragment>
      <header className="absolute w-full left-0 top-0  p-4">
        <div className="flex justify-between items-center container">
          <Link href="/"></Link>
          <div className="hidden md:flex gap-4 items-center">
            <span className="text-sm">Don&apos;t have an account</span>
            <Link href="/register" className="btn px-4 py-1.5 text-sm">
              Register
            </Link>
          </div>
        </div>
      </header>
      <main className="w-screen h-screen bg-slate-50 flex justify-center items-center">
        <div className="w-full h-full pt-10 md:pt-0 md:h-max md:max-w-[470px] bg-white  md:rounded-md md:shadow-md  overflow-hidden">
          <div className="px-4 md:px-8 py-10">
            <div className=" mb-6">
              <h1 className="text-xl font-semibold">
                {pathname === "/register"
                  ? "Silahkan daftar untuk membuat akun"
                  : pathname === "/forget-password"
                  ? "Silahkan ganti kata sandi anda dengan akun terdaftar"
                  : "Login to ulearn"}
              </h1>
              <p className="text-base text-gray-700 mt-1">
                {pathname === "/register"
                  ? "Silahkan daftar untuk membuat akun"
                  : pathname === "/forget-password"
                  ? "Silahkan ganti kata sandi anda dengan akun terdaftar"
                  : "welcome back! Please login to continue"}
              </p>
            </div>
            {googleRender.includes(pathname) && (
              <Fragment>
                <button
                  className="flex items-center justify-center gap-2 w-full px-4  border border-gray-300 rounded-md  text-xs font-medium hover:border-purple-700 transition-all duration-300 ease-in-out py-2"
                  type="button"
                  //   onClick={() => {
                  //     signIn("google", { callbackUrl, redirect: false });
                  //   }}
                >
                  <Image
                    src="/google.svg"
                    width={20}
                    height={20}
                    alt="google"
                    priority
                  />
                  {pathname === "/register" ? "Register" : "Login"} With Google
                </button>

                <div className="flex items-center my-4">
                  <div className="w-full h-[1px] bg-gray-200"></div>
                  <span className="mx-4 text-gray-500 text-sm">or</span>
                  <div className="w-full h-[1px] bg-gray-200"></div>
                </div>
              </Fragment>
            )}

            {renderView(pathname, success, setSuccess)}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
