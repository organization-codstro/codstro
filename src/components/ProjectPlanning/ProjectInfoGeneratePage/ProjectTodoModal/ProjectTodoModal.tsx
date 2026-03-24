import React from "react";
import { X } from "lucide-react";
import { TodoForm } from "./TodoForm";
import { ProjectTodoModalProps } from "../../../../types/pages/ProjectPlanning/ProjectInfoGeneratePage/ProjectTodoModal/ProjectTodoModal";

export const ProjectTodoModal: React.FC<ProjectTodoModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 mx-4 overflow-y-auto bg-white rounded-lg max-h-[60vh]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            New Project Task
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <TodoForm onAdd={onAdd} onCancel={onClose} />
      </div>
    </div>
  );
};
