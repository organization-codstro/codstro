import React from "react";
import { ManagementSidebarProps } from "../../../types/pages/Woomoonjeong/DocumentsManagementPage/ManagementSidebar";

export const ManagementSidebar: React.FC<ManagementSidebarProps> = ({
  data,
  totalFields,
  totalPins,
}) => {
  const types = ["web", "app", "server", "game", "security", "work", "other"];
  const typeColors: Record<string, string> = {
    web: "bg-red-400",
    app: "bg-orange-400",
    server: "bg-yellow-400",
    game: "bg-green-400",
    security: "bg-blue-400",
    work: "bg-indigo-400",
    other: "bg-purple-400",
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
        <h3 className="mb-4 font-semibold text-gray-800">Overview</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Total Fields</span>
            <span className="font-medium">{totalFields}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Pins</span>
            <span className="font-medium">{totalPins}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
