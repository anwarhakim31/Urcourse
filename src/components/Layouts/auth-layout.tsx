"use client";
import Image from "next/image";
import React, { Fragment } from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";
import LoginView from "../views/auth/login-view";
import RegisterView from "../views/auth/register-view";
import ForgotView from "../views/auth/forget-password";
import ResetPasswordView from "../views/auth/reset-password-view";
import LogoComponent from "../ui/logo-component";

import useGoogleSignIn from "@/hooks/auth/useGoogleSignIn";

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

  const { handleGoogleSignIn, loading } = useGoogleSignIn();

  return (
    <Fragment>
      <header className="absolute w-full left-0 top-0 py-2 md:py-4">
        <div className="flex justify-between items-center container">
          <LogoComponent />
          <div className="hidden md:flex gap-4 items-center">
            <span className="text-sm">Don&apos;t have an account</span>
            <Link
              href={pathname === "/register" ? "/login" : "/register"}
              className="btn px-4 py-1.5 text-sm"
            >
              {pathname === "/register" ? "Login" : "Register"}
            </Link>
          </div>
        </div>
      </header>
      <main className="w-full h-screen  bg-slate-50 flex-center">
        <div className="w-full h-full  pt-10 md:pt-0 flex flex-col  justify-center container   md:h-max md:max-w-[450px] bg-white  md:rounded-md md:shadow-md  overflow-hidden">
          {success && pathname === "/forget-password" && (
            <div className="flex-center mt-6">
              <Image
                src={"/mailer.svg"}
                alt="success"
                width={175}
                height={175}
              />
            </div>
          )}
          {success && pathname === "/reset-password" && (
            <div className="flex-center mt-6">
              <Image
                src={"/check.svg"}
                alt="success"
                width={100}
                height={100}
              />
            </div>
          )}
          <div className={`px-4 md:px-8  ${success ? "py-2" : "py-8"}`}>
            <div className=" mb-6">
              <h1
                className={`text-xl font-semibold ${
                  success ? "text-center" : ""
                }`}
              >
                {pathname === "/register"
                  ? "Create your account"
                  : pathname === "/reset-password"
                  ? "Reset your password"
                  : pathname === "/forget-password"
                  ? "Forget Password"
                  : "Login to Urcourse"}
              </h1>
              <p
                className={`text-sm text-gray-700 mt-1 ${
                  success ? "text-center" : ""
                }`}
              >
                {pathname === "/register" ? (
                  "Welcome! Please fill in the details to get started."
                ) : pathname === "/reset-password" ? (
                  <>
                    {success
                      ? "Password reset successfully, you can login now"
                      : "Please enter a new password."}
                  </>
                ) : pathname === "/forget-password" ? (
                  <>
                    {success
                      ? "We have sent you an email to reset your password."
                      : "Please enter your email address to receive a link to reset your password."}
                  </>
                ) : (
                  "welcome back! Please login to continue"
                )}
              </p>
            </div>
            {googleRender.includes(pathname) && (
              <Fragment>
                <button
                  className="flex items-center justify-center gap-2 w-full px-4  border border-gray-300 rounded-md  text-xs font-medium hover:border-purple-700 transition-all duration-300 ease-in-out py-2.5"
                  type="button"
                  onClick={() => handleGoogleSignIn()}
                  disabled={loading}
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

                <div className="flex items-center mt-4 mb-2">
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
