import React from "react";
import { CloneCodingProjectStatusCardProps } from "../../../types/pages/Woomoonro/CloneCodingProjectDetailPage/CloneCodingProjectStatusCard";

const ProjectStatusCard: React.FC<CloneCodingProjectStatusCardProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="p-4 space-y-6 rounded-lg md:p-0 bg-gray-50 md:bg-transparent">
      <div>
        <h3 className="mb-2 font-medium text-gray-800">Project Status</h3>
        <select
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
        >
          <option value="waiting">waiting</option>
          <option value="in progress">in progress</option>
          <option value="done">done</option>
        </select>
      </div>

      {/* {totalTodos > 0 && (
        <div className="pt-2">
          <ProgressBar
            percentage={progressPercentage}
            label="Overall Progress"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>
              {completedTodos} / {totalTodos} Tasks
            </span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProjectStatusCard;
