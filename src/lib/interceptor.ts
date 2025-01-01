import axios from "axios";
// import { getSession } from "next-auth/react";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  },
  timeout: 60 * 1000,
});

// let cacheAccessToken: string | null = null;

instance.interceptors.request.use(
  async (config) => {
    // if (!cacheAccessToken) {
    //   const session = await getSession();
    //   cacheAccessToken = session?.user?.accessToken || null;
    // }

    // if (cacheAccessToken) {
    //   config.headers["Authorization"] = `Bearer ${cacheAccessToken}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
