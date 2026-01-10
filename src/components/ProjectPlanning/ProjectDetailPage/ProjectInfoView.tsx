import { Calendar } from "lucide-react";
import { ProjectInfoViewProps } from "../../../types/pages/ProjectPlanning/ProjectDetailPage/ProjectInfoView";

export const ProjectInfoView = ({ project }: ProjectInfoViewProps) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Project Information
      </h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <p className="mt-1 text-gray-900">
            {project.project_description || "No description provided"}
          </p>
        </div>
        {project.project_stacks && (
          <div>
            <label className="text-sm font-medium text-gray-700">
              Tech Stack
            </label>
            <p className="mt-1 text-gray-900">{project.project_stacks}</p>
          </div>
        )}
        {project.project_start_date && project.project_end_date && (
          <div>
            <label className="text-sm font-medium text-gray-700">
              Timeline
            </label>
            <div className="flex items-center mt-1 space-x-2 text-gray-900">
              <Calendar className="w-4 h-4" />
              <span>
                {project.project_start_date} - {project.project_end_date}
              </span>
            </div>
          </div>
        )}
        {project.project_style && (
          <div>
            <label className="text-sm font-medium text-gray-700">
              Design Style
            </label>
            <p className="mt-1 text-gray-900">{project.project_style}</p>
          </div>
        )}
        {project.project_effect && (
          <div>
            <label className="text-sm font-medium text-gray-700">Effects</label>
            <p className="mt-1 text-gray-900">{project.project_effect}</p>
          </div>
        )}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Main Color
          </label>
          <div className="flex items-center mt-2 space-x-2">
            <div
              className="w-8 h-8 border border-gray-300 rounded-full"
              style={{ backgroundColor: project.project_main_color }}
            />
            <span className="text-gray-900">{project.project_main_color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
