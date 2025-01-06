import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { forwardRef } from "react";

import "react-quill/dist/quill.snow.css";

interface PropsType {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

// Gunakan forwardRef untuk menangani ref
const RichEditor = forwardRef<HTMLDivElement, PropsType>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ placeholder, onChange, value, className }: PropsType, ref) => {
    const ReactQuill = React.useMemo(
      () =>
        dynamic(() => import("react-quill-new"), {
          ssr: false,
          loading: () => <p className="text-sm">Loading...</p>,
        }),
      []
    );

    return (
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn("text-sm min-h-32 rounded-md ", className)}
      />
    );
  }
);

RichEditor.displayName = "RichEditor";

export default RichEditor;
