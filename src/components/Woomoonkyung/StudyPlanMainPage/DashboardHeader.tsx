import React from "react";
import { Plus, Archive } from "lucide-react";
import { DashboardHeaderProps } from "../../../types/pages/Woomoonkyung/StudyPlanMainPage/DashboardHeader";

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  onArchiveClick,
  onCreateClick,
}) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onArchiveClick}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <Archive className="w-4 h-4" />
          Archive
        </button>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Study Plan
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
