import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { getToken } from "next-auth/jwt";

const authPage = ["login", "register", "forget-password", "reset-password"];

export const withAuth = (
  middleware: NextMiddleware,
  requiredAuths: string[]
) => {
  return async (req: NextRequest, ev: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    const token = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as {
      id: string;
      isAdmin: boolean;
    };

    if (!token && requiredAuths.includes(pathname)) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));

      return NextResponse.redirect(url);
    }

    if (token) {
      if (authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (!token.isAdmin && req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, ev);
  };
};
