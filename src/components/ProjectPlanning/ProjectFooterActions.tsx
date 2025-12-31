import React from "react";
import { Save } from "lucide-react";

interface ProjectFooterActionsProps {
  onBack: () => void;
  onSubmit: () => void;
  submitLabel?: string;
}

export const ProjectFooterActions: React.FC<ProjectFooterActionsProps> = ({
  onBack,
  onSubmit,
  submitLabel = "Create Project",
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-3 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Back
      </button>

      <button
        type="button"
        onClick={onSubmit}
        className="flex items-center px-6 py-3 space-x-2 font-medium text-white rounded-lg"
        style={{ backgroundColor: "#587CF0" }}
      >
        <Save className="w-5 h-5" />
        <span>{submitLabel}</span>
      </button>
    </div>
  );
};
