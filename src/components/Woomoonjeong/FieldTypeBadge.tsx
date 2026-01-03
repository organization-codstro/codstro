// FieldTypeBadge.tsx
import React from "react";
import { fieldTypeColors } from "../../data/woomoonjeong/woomoonjeongData";

interface FieldTypeBadgeProps {
  type: string;
}

export const FieldTypeBadge: React.FC<FieldTypeBadgeProps> = ({ type }) => {
  return (
    <span
      className={`inline-block px-2 py-1 mt-1 text-xs border rounded-full ${
        (type in fieldTypeColors
          ? fieldTypeColors[type as keyof typeof fieldTypeColors]
          : null) || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {type}
    </span>
  );
};
