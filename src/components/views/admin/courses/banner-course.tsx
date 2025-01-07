"use client";
import { Rocket, TriangleAlert } from "lucide-react";
import React from "react";

const BannerComponent = ({
  complatedField,
  totalField,
  isPublish,
  complated,
  type,
}: {
  complatedField: number;
  totalField: number;
  complated: boolean;
  isPublish: boolean;
  type: string;
}) => {
  return isPublish ? null : (
    <div className=" bg-yellow-200  flex gap-2 items-center py-2.5 px-8">
      {complated ? (
        <Rocket size={18} strokeWidth={1.5} />
      ) : (
        <TriangleAlert size={18} strokeWidth={1.5} />
      )}
      <div>
        <p className="text-sm font-medium">
          {complated
            ? "fields are completed"
            : ` Complate all fields (${complatedField}/${totalField})`}
        </p>
        <p className="text-xs">
          {complated
            ? `You can publish the ${type}`
            : `You can only publish the ${type} when all fields are completed`}
        </p>
      </div>
    </div>
  );
};

export default BannerComponent;
