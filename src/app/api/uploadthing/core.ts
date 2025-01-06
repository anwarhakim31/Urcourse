import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session) throw new UploadThingError("Unauthorized");

  return { userId: session?.user?.id };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploder: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  videoUploder: f({
    video: { maxFileSize: "16GB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  resourceUploader: f(["text", "image", "video", "audio", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
