import { ArrowRight } from "lucide-react";
import { ProjectInfoActionsProps } from "../../../types/pages/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInfoActions";

export const ProjectInfoActions = ({ onCancel, onNext }: ProjectInfoActionsProps) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onNext}
          className="flex items-center px-6 py-3 space-x-2 font-medium text-white transition-all rounded-lg shadow-md active:scale-95 bg-[#587CF0]"
        >
          <span>Next: AI Chat</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
