import AuthLayout from "@/components/Layouts/auth-layout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

export default function LoginPage() {
  return <AuthLayout />;
}
