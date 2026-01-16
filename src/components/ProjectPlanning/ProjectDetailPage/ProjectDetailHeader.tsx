import { ArrowLeft, Edit, Play, Clock, Save, X } from "lucide-react";
import { ProjectDetailHeaderProps } from "../../../types/pages/ProjectPlanning/ProjectDetailPage/ProjectDetailHeader";

export const ProjectDetailHeader = ({
  project,
  isEditing,
  onBack,
  onContinuePlanning,
  onEdit,
  onCancel,
  onSave,
}: ProjectDetailHeaderProps) => {
  const isPlanning = project.project_status === "planning";
  const isActive = project.project_status === "active";

  return (
    <div className="px-8 py-6 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3">
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
              <p className="mt-1 text-gray-600">{project.project_topic}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isPlanning && (
              <button
                onClick={onContinuePlanning}
                className="flex items-center px-4 py-2 space-x-2 font-medium text-white rounded-lg bg-[#587CF0]"
              >
                <Edit className="w-4 h-4" />
                <span>Continue Planning</span>
              </button>
            )}
            {isActive && !isEditing && (
              <button
                onClick={onEdit}
                className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Project</span>
              </button>
            )}
            {isActive && isEditing && (
              <>
                <button
                  onClick={onCancel}
                  className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={onSave}
                  className="flex items-center px-4 py-2 space-x-2 font-medium text-white rounded-lg bg-[#587CF0]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
