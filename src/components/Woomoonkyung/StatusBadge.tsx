import React from "react";
import { StatusBadgeProps } from "../../types/pages/Woomoonkyung/StatusBadge";
import { STATE_COLORS } from "../../constants/Woomoonkyung/Woomoonkyung";

export const StatusBadge: React.FC<StatusBadgeProps> = ({ state }) => {
  return (
    <span
      className={`px-3 py-1 text-sm rounded-full border ${
        STATE_COLORS[state] || "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {state}
    </span>
  );
};
