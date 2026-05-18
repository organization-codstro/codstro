import React from "react";
import { CloneCodingProjectStatusCardProps } from "../../../types/pages/CloneCodingProject/CloneCodingProjectDetailPage/CloneCodingProjectStatusCard";
import { CLONE_CODING_STATE_TYPE } from "../../../constants/CloneCodingProject/CloneCodingProject";

export const ProjectStatusCard: React.FC<CloneCodingProjectStatusCardProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="p-4 space-y-6 rounded-lg md:p-0 bg-gray-50 md:bg-transparent">
      <div>
        <h3 className="mb-2 font-medium text-gray-800">Project Status</h3>
        <select
          value={currentStatus}
          onChange={(e) =>
            onStatusChange(e.target.value as CLONE_CODING_STATE_TYPE)
          }
          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
        >
          <option value="waiting">waiting</option>
          <option value="in progress">in progress</option>
          <option value="done">done</option>
        </select>
      </div>
    </div>
  );
};
