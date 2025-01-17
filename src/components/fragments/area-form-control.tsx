import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import RichEditor from "../ui/rich-editor";

const AreaFormControl = ({
  field,
  label,
  className,
  placeholder = "Enter your description",
}: {
  field: {
    value?: string | null;
    onChange?: (value: string) => void;
  };
  label: string;
  className?: string;
  placeholder?: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <FormItem>
      <FormLabel className="font-medium text-xs">{label}</FormLabel>
      <div className="relative w-full bg-white">
        <FormControl>
          <RichEditor
            ref={ref}
            onChange={field.onChange}
            placeholder={placeholder}
            value={field.value as string}
            className={className}
          />
        </FormControl>
      </div>

      <FormMessage className="text-xs" />
    </FormItem>
  );
};

export default AreaFormControl;
