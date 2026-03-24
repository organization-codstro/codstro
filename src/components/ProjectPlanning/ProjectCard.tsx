import { useState, useRef } from "react";
import { Calendar, Trash2 } from "lucide-react";
import { ProjectCardProps } from "../../types/pages/ProjectPlanning/ProjectCard";

export const ProjectCard = ({
  project,
  onClick,
  onContinue,
  onDelete,
}: ProjectCardProps) => {
  const isPlanning = project.project_status === "waiting";
  const [deleteState, setDeleteState] = useState<"idle" | "confirm">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (deleteState === "idle") {
      setDeleteState("confirm");
      timerRef.current = setTimeout(() => {
        setDeleteState("idle");
      }, 3000);
    } else if (deleteState === "confirm") {
      if (timerRef.current) clearTimeout(timerRef.current);
      onDelete?.(project.project_id);
      setDeleteState("idle");
    }
  };

  return (
    <div
      className="relative p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
      onClick={onClick}
    >
      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        className={`
          absolute top-3 right-3 p-1.5 rounded-md transition-all duration-300
          ${
            deleteState === "confirm"
              ? "bg-red-500 text-white scale-110"
              : "text-gray-300 hover:text-red-400 hover:bg-red-50"
          }
        `}
        title={
          deleteState === "confirm" ? "한 번 더 클릭하면 삭제됩니다" : "삭제"
        }
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="flex items-start justify-between pr-6 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {project.project_name}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{project.project_topic}</p>
        </div>
        <div
          className="flex-shrink-0 w-4 h-4 ml-2 rounded-full"
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

      {/* Confirm Delete Overlay Message */}
      {deleteState === "confirm" && (
        <div className="absolute text-xs font-medium text-red-500 bottom-3 right-3 animate-pulse">
          한 번 더 클릭하면 삭제 됩니다.
        </div>
      )}
    </div>
  );
};
