import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

import ImageUploadBox from "./image-upload-box";

const ImageFormControl = ({
  field,
  label,
}: {
  field: {
    value?: string;
    onChange?: (value: string) => void;
  };
  label: string;
  className?: string;
}) => {
  return (
    <FormItem className="w-full">
      <FormLabel className="font-medium text-xs ">{label}</FormLabel>
      <div className="relative w-full">
        <FormControl>
          <ImageUploadBox
            value={field.value}
            onChange={field.onChange}
            endpoint="imageUploder"
          />
        </FormControl>
      </div>

      <FormMessage />
    </FormItem>
  );
};

export default ImageFormControl;
