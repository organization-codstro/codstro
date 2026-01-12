import React from "react";
import { ActivePlanSectionProps } from "../../../types/Woomoonkyung/WoomoonkyungMainPage/ActivePlanSection";

const ActivePlanSection: React.FC<ActivePlanSectionProps> = ({
  count,
  children,
}) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <h2 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-800">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Active My Plans ({count})
      </h2>
      {children}
    </div>
  );
};

export default ActivePlanSection;
