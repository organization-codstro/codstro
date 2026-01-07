import React from "react";
import { stateColors } from "../../data/Woomoonkyung/woomoonkyungData";

interface StatusBadgeProps {
  state: "waiting" | "in progress" | "done";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ state }) => {
  return (
    <span
      className={`px-3 py-1 text-sm rounded-full border ${
        stateColors[state] || "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {state}
    </span>
  );
};

export default StatusBadge;
