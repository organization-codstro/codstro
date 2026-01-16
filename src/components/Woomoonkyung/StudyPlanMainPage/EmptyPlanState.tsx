import React from "react";
import { EmptyPlanStateProps } from "../../../types/pages/Woomoonkyung/StudyPlanMainPage/EmptyPlanState";

const EmptyPlanState: React.FC<EmptyPlanStateProps> = ({
  message,
  actionLabel,
  onActionClick,
}) => {
  return (
    <div className="py-20 text-center border-2 border-gray-100 border-dashed rounded-xl bg-white/50">
      <p className="text-gray-400">{message}</p>
      <button
        onClick={onActionClick}
        className="mt-2 text-[#587CF0] font-medium hover:underline transition-all"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyPlanState;
