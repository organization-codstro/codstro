import { Plus } from "lucide-react";
import { ProjectListHeaderProps } from "../../../types/pages/ProjectPlanning/ProjectMainPage/ProjectListHeader";

export const ProjectListHeader = ({ onNewProject }: ProjectListHeaderProps) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
      <p className="mt-1 text-gray-600">
        Plan and manage your projects with AI
      </p>
    </div>
    <button
      onClick={onNewProject}
      className="flex items-center px-6 py-3 space-x-2 font-medium text-white transition-all rounded-lg hover:opacity-90 bg-[#587CF0]"
    >
      <Plus className="w-5 h-5" />
      <span>New Project</span>
    </button>
  </div>
);
