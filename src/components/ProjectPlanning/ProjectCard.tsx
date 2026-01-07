import { Calendar } from "lucide-react";
import { ProjectCardProps } from "../../types/ProjectPlanning/ProjectCard";

export const ProjectCard = ({
  project,
  onClick,
  onContinue,
}: ProjectCardProps) => {
  const isPlanning = project.project_status === "planning";

  return (
    <div
      className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {project.project_name}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{project.project_topic}</p>
        </div>
        <div
          className="flex-shrink-0 w-4 h-4 rounded-full"
          style={{ backgroundColor: project.project_main_color }}
        />
      </div>
      <p className="mb-3 text-sm text-gray-500 line-clamp-2">
        {project.project_description}
      </p>

      {isPlanning ? (
        <div className="flex items-center justify-between mt-4">
          <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded">
            Planning
          </span>
          {onContinue && (
            <button
              onClick={onContinue}
              className="px-4 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Continue Planning →
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>
              {project.project_start_date} - {project.project_end_date}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
