import { useState } from "react";
import { Calendar, Edit, Save, X } from "lucide-react";
import { Project } from "../../../types/common/ProjectPlanning";
import { ProjectInfoViewProps } from "../../../types/pages/ProjectPlanning/ProjectDetailPage/ProjectInfoView";

export const ProjectInfoView = ({
  project,
  onSave,
  isPlanning = false,
}: ProjectInfoViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState<Project>(project);

  const handleEdit = () => {
    setEdited(project);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEdited(project);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await onSave?.(edited);
    setIsEditing(false);
  };

  const field = (label: string, content: React.ReactNode) => (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">{content}</div>
    </div>
  );

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400";

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Project Information
        </h2>
        {!isPlanning && (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-white rounded-lg bg-[#587CF0]"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <>
            {field(
              "Project Name",
              <input
                type="text"
                value={edited.project_name}
                onChange={(e) =>
                  setEdited({ ...edited, project_name: e.target.value })
                }
                className={inputClass}
              />,
            )}
            {field(
              "Topic",
              <input
                type="text"
                value={edited.project_topic}
                onChange={(e) =>
                  setEdited({ ...edited, project_topic: e.target.value })
                }
                className={inputClass}
              />,
            )}
            {field(
              "Description",
              <textarea
                value={edited.project_description ?? ""}
                onChange={(e) =>
                  setEdited({ ...edited, project_description: e.target.value })
                }
                rows={3}
                className={inputClass}
              />,
            )}
            <div className="grid grid-cols-2 gap-3">
              {field(
                "Start Date",
                <input
                  type="date"
                  value={edited.project_start_date}
                  onChange={(e) =>
                    setEdited({ ...edited, project_start_date: e.target.value })
                  }
                  className={inputClass}
                />,
              )}
              {field(
                "End Date",
                <input
                  type="date"
                  value={edited.project_end_date}
                  onChange={(e) =>
                    setEdited({ ...edited, project_end_date: e.target.value })
                  }
                  className={inputClass}
                />,
              )}
            </div>
            {field(
              "Main Color",
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={edited.project_main_color}
                  onChange={(e) =>
                    setEdited({ ...edited, project_main_color: e.target.value })
                  }
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={edited.project_main_color}
                  onChange={(e) =>
                    setEdited({ ...edited, project_main_color: e.target.value })
                  }
                  className={`flex-1 ${inputClass}`}
                />
              </div>,
            )}
            {field(
              "Design Style",
              <input
                type="text"
                value={edited.project_style ?? ""}
                onChange={(e) =>
                  setEdited({ ...edited, project_style: e.target.value })
                }
                placeholder="Optional"
                className={inputClass}
              />,
            )}
            {field(
              "Effects",
              <input
                type="text"
                value={edited.project_effect ?? ""}
                onChange={(e) =>
                  setEdited({ ...edited, project_effect: e.target.value })
                }
                placeholder="Optional"
                className={inputClass}
              />,
            )}
          </>
        ) : (
          <>
            {field(
              "Description",
              <p className="text-gray-900">
                {project.project_description || "No description provided"}
              </p>,
            )}
            {project.project_stacks &&
              field(
                "Tech Stack",
                <p className="text-gray-900">{project.project_stacks}</p>,
              )}
            {project.project_start_date &&
              project.project_end_date &&
              field(
                "Timeline",
                <div className="flex items-center space-x-2 text-gray-900">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {project.project_start_date} - {project.project_end_date}
                  </span>
                </div>,
              )}
            {project.project_style &&
              field(
                "Design Style",
                <p className="text-gray-900">{project.project_style}</p>,
              )}
            {project.project_effect &&
              field(
                "Effects",
                <p className="text-gray-900">{project.project_effect}</p>,
              )}
            {field(
              "Main Color",
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 border border-gray-300 rounded-full"
                  style={{ backgroundColor: project.project_main_color }}
                />
                <span className="text-gray-900">
                  {project.project_main_color}
                </span>
              </div>,
            )}
          </>
        )}
      </div>
    </div>
  );
};
