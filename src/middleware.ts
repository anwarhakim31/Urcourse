import { NextResponse } from "next/server";
import { withAuth } from "./middlewares/withAuth";

function middleware() {
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return;
}

export default withAuth(middleware, ["admin", "profile"]);
