import React from "react";
import { Plus } from "lucide-react";
import { ProjectTodoItem } from "./ProjectTodoItem";
import { ProjectTasksSectionProps } from "../../../../types/pages/ProjectPlanning/ProjectInfoGeneratePage/ProjectTasksSection/ProjectTasksSection";

export const ProjectTasksSection: React.FC<ProjectTasksSectionProps> = ({
  projectTodos,
  editingTodoClientId,
  setEditingTodoClientId,
  updateProjectTodo,
  deleteProjectTodo,
  getStatusColor,
  onAddClick,
}) => {
  return (
    <div className="sticky p-6 bg-white border border-gray-200 rounded-lg top-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Project Tasks</h2>
        <button
          type="button"
          onClick={onAddClick}
          className="flex items-center px-3 py-1 space-x-1 text-sm text-white rounded"
          style={{ backgroundColor: "#587CF0" }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
        {projectTodos.length === 0 ? (
          <p className="py-4 text-sm text-center text-gray-500">
            No project tasks yet
          </p>
        ) : (
          projectTodos.map((todo) => (
            <ProjectTodoItem
              key={todo.client_id}
              todo={todo}
              isEditing={editingTodoClientId === todo.client_id}
              onEdit={() => setEditingTodoClientId(todo.client_id)}
              onCancelEdit={() => setEditingTodoClientId(null)}
              onUpdate={updateProjectTodo}
              onDelete={deleteProjectTodo}
              getStatusColor={getStatusColor}
            />
          ))
        )}
      </div>
    </div>
  );
};
