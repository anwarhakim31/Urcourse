import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import RichEditor from "../ui/rich-editor";

const AreaFormControl = ({
  field,
  label,
  className,
}: {
  field: {
    value?: string | null;
    onChange?: (value: string) => void;
  };
  label: string;
  className?: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <FormItem>
      <FormLabel className="font-medium text-xs">{label}</FormLabel>
      <div className="relative w-full">
        <FormControl>
          <RichEditor
            ref={ref}
            placeholder="Enter your description"
            onChange={field.onChange}
            value={field.value as string}
            className={className}
          />
        </FormControl>
      </div>

      <FormMessage />
    </FormItem>
  );
};

export default AreaFormControl;
