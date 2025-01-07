"use client";
import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

const FileFormControl = ({
  field,
  label,
  type = "video",
  disable = false,
}: {
  field: {
    value?: string | null;
    onChange?: (value: string) => void;
  };
  type?: string;
  label: string;
  className?: string;
  disable?: boolean;
}) => {
  return (
    <FormItem className="w-full">
      <FormLabel className="font-medium text-xs">{label}</FormLabel>
      <div className="relative w-full">
        <FormControl>
          {type === "video" && field.value ? (
            <>
              <div className="aspect-video max-h-[250px]">
                <ReactPlayer
                  url={field.value}
                  controls
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <p className=" border p-2 mt-4 text-sm border-indigo-700 relative bg-indigo-400/20 rounded-md">
                {field.value}
                <button
                  type="button"
                  onClick={() => field.onChange?.("")}
                  className="absolute -top-3 right-0 rounded-full block  p-1 bg-red-500 text-white hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </p>
            </>
          ) : (
            <UploadDropzone
              endpoint={type === "video" ? "videoUploder" : "resourceUploader"}
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  field.onChange?.(res[0].url);
                  toast.success("File uploaded successfully!");
                }
              }}
              disabled={disable}
              onUploadError={(error: Error) => {
                toast.error(error.message);
              }}
              className={cn(
                "w-full h-[250px] py-0 px-0 bg-white",
                disable && "cursor-not-allowed pointer-events-none"
              )}
            />
          )}
        </FormControl>
      </div>

      <FormMessage />
    </FormItem>
  );
};

export default FileFormControl;
