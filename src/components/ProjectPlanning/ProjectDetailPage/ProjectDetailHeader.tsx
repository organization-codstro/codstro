import { ArrowLeft, Play, Clock } from "lucide-react";
import { ProjectDetailHeaderProps } from "../../../types/pages/ProjectPlanning/ProjectDetailPage/ProjectDetailHeader";

export const ProjectDetailHeader = ({
  project,
  onBack,
  onContinuePlanning,
}: Omit<
  ProjectDetailHeaderProps,
  "isEditing" | "onEdit" | "onCancel" | "onSave"
>) => {
  const isPlanning = project.project_status === "waiting";

  return (
    <div className="px-8 py-6 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-10 space-x-4">
            <div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onBack}
                  className="p-2 pr-4 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {project.project_name}
                </h1>

                {isPlanning ? (
                  <span className="flex items-center px-3 py-1 space-x-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>Planning</span>
                  </span>
                ) : (
                  <span className="flex items-center px-3 py-1 space-x-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                    <Play className="w-4 h-4" />
                    <span>Active</span>
                  </span>
                )}
              </div>
              <p className="mt-1 text-gray-600 pl-14">
                {project.project_topic}
              </p>
            </div>
          </div>

          {isPlanning && (
            <button
              onClick={onContinuePlanning}
              className="flex items-center px-4 py-2 space-x-2 font-medium text-white rounded-lg bg-[#587CF0]"
            >
              <span>Continue Planning</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
