"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface PropsType {
  value?: string;
  onChange?: (url: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export default function ImageUploadBox({
  value,
  onChange,
  endpoint,
}: PropsType) {
  const [hover, setHover] = React.useState(false);

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {value ? (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative w-full h-[250px]  rounded-md  border border-dashed mt-2 border-slate-300 overflow-hidden flex-center"
        >
          {hover && (
            <button
              type="button"
              onClick={() => onChange?.("")}
              className="z-10 absolute top-0 left-0 w-full h-full flex-center bg-black/50 transition-all duration-300 ease-in-out"
            >
              <X size={80} color="white" strokeWidth={1.5} />
            </button>
          )}
          <Image
            src={value || ""}
            width={200}
            height={200}
            alt="Uploaded image"
            priority
            className="w-auto h-[250px] bg-contain "
          />
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) {
              onChange?.(res[0].url);
              toast.success("Image uploaded successfully!");
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(error.message);
          }}
          className="w-full h-[250px] py-0 px-0"
        />
      )}
    </div>
  );
}
