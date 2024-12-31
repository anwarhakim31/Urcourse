import axios from "axios";
import { getSession } from "next-auth/react";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  },
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getSession();

    if (token) {
      config.headers.Authorization = `Bearer ${token?.user}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
