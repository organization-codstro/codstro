import React from "react";
import { Save, Loader2 } from "lucide-react";
import { ProjectFooterActionsProps } from "../../../types/pages/ProjectPlanning/ProjectInfoGeneratePage/ProjectFooterActions";

export const ProjectFooterActions: React.FC<ProjectFooterActionsProps> = ({
  onSave,
  onSubmit,
  submitLabel = "Create Project",
  disabled,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="px-6 py-3 font-medium text-gray-700 border border-gray-300 rounded-lg transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        Save
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        className="flex items-center px-6 py-3 space-x-2 font-medium text-white rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        style={{ backgroundColor: "#587CF0" }}
      >
        {/* 로딩 중일 때 아이콘 변경 (선택 사항) */}
        {disabled ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        <span>{disabled ? "Processing..." : submitLabel}</span>
      </button>
    </div>
  );
};
