import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ButtonMethod = ({
  item,
  onClick,
  disabled,
  method,
}: {
  item: { name: string; image: string; type: string };
  onClick?: () => void;
  disabled?: boolean;
  method: { name: string; image: string; type: string } | null;
}) => {
  return (
    <button
      key={item.name}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 border border-slate-300 rounded-md px-4 py-1.5 text-xs text-medium",
        method?.name === item?.name && "border-indigo-700 text-indigo-700"
      )}
    >
      <Image src={item.image} alt={item.name} width={50} height={25} priority />

      <span>{item.name}</span>
    </button>
  );
};

export default ButtonMethod;
