import { NextRequest } from "next/server";
import { ResponseErrorApi } from "./response-error";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: NextRequest,
  isAdmin: boolean = false
) => {
  const token = req.headers.get("Authorization")?.split(" ")[1] || "";

  if (!token) {
    return ResponseErrorApi(401, "Unauthorized, Please login first");
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET || "");

    if (verify && typeof verify === "object" && "isAdmin" in verify) {
      if (isAdmin && verify.isAdmin !== true) {
        return ResponseErrorApi(
          403,
          "Forbidden Access, you don't have permission"
        );
      }

      return verify;
    }
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(401, "Unauthorized");
  }
};
