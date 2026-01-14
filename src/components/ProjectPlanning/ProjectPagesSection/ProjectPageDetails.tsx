import React from "react";
import { ProjectPageDetailsProps } from "../../../types/pages/ProjectPlanning/ProjectPagesSection/ProjectPageDetails";

export const ProjectPageDetails: React.FC<ProjectPageDetailsProps> = ({
  isEditing,
  page,
  onUpdateField,
}) => {
  if (isEditing) {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">Role</label>
        <input
          type="text"
          value={page.project_page_role}
          onChange={(e) => onUpdateField("project_page_role", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={page.project_page_is_complete}
            onChange={(e) =>
              onUpdateField("project_page_is_complete", e.target.checked)
            }
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className="text-xs font-medium text-gray-700">
            Mark as complete
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-gray-500 font-medium">
        Role: {page.project_page_role}
      </span>
      <span
        className={`px-2 py-1 rounded ${
          page.project_page_is_complete
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {page.project_page_is_complete ? "Complete" : "In Progress"}
      </span>
    </div>
  );
};
