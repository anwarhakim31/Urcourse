import { NextResponse } from "next/server";
import { withAuth } from "./middlewares/withAuth";

function middleware() {
  return NextResponse.next();
}

export default withAuth(middleware, ["admin", "profile"]);
