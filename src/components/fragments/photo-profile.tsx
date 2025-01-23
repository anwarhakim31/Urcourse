import { splitFullName } from "@/utils/helpers";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React from "react";
import { FormControl, FormItem } from "../ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";

const PhotoProfile = ({
  field,
  fullname,
  isEdit,
  row,
}: {
  field: { value?: string; onChange?: (value: string) => void };
  fullname: string;
  isEdit: boolean;
  row?: boolean;
}) => {
  return (
    <FormItem className={`flex-center gap-4  ${row ? "flex-row" : "flex-col"}`}>
      <FormControl>
        {field.value ? (
          <div className="w-[120px] h-[120px] rounded-full border">
            <Image
              src={field.value?.replace("s96-c", "s512-c") || ""}
              width={1000}
              height={1000}
              alt={"photo"}
              className="w-full h-full rounded-full object-cover bg-slate-100 "
            />
          </div>
        ) : (
          <div className="w-[120px] h-[120px] rounded-full flex-center border bg-indigo-700">
            <span className="text-5xl font-semibold text-white">
              {splitFullName(fullname || "")}
            </span>
          </div>
        )}
      </FormControl>
      {isEdit &&
        (field.value ? (
          <Button
            onClick={() => field.onChange?.("")}
            className="bg-blue-600 h-9 text-sm"
          >
            Remove
          </Button>
        ) : (
          <UploadButton
            endpoint={"imageUploder"}
            className="text-sm h-14"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                field.onChange?.(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(error.message);
            }}
          />
        ))}
    </FormItem>
  );
};

export default PhotoProfile;
