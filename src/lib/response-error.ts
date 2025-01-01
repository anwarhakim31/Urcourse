import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { toast } from "sonner";

export const ResponseErrorApi = (code: number, message: string) => {
  return NextResponse.json({ message, success: false, code }, { status: code });
};

export const ResponseErrorAxios = (error: Error) => {
  if (
    error instanceof AxiosError &&
    error.response?.data &&
    error.response?.data.message
  ) {
    return toast.error(error.response.data.message);
  }
};
