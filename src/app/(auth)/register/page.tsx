import React from "react";

import { Metadata } from "next";
import AuthLayout from "@/components/Layouts/auth-layout";

export const metadata: Metadata = {
  title: "Register",
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

const RegisterPage = () => {
  return <AuthLayout />;
};

export default RegisterPage;
