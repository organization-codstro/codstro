import React from "react";
import { Plus } from "lucide-react";
import { Todo } from "../../types/ProjectPlanning/project";
import { ProjectTodoItem } from "./ProjectTodoItem";

interface ProjectTasksSectionProps {
  projectTodos: Todo[];
  editingTodoId: number | null;
  setEditingTodoId: (id: number | null) => void;
  updateProjectTodo: (todoId: number, updates: Partial<Todo>) => void;
  deleteProjectTodo: (todoId: number) => void;
  getStatusColor: (status: string) => string;
  onAddClick: () => void;
}

export const ProjectTasksSection: React.FC<ProjectTasksSectionProps> = ({
  projectTodos,
  editingTodoId,
  setEditingTodoId,
  updateProjectTodo,
  deleteProjectTodo,
  getStatusColor,
  onAddClick,
}) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
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

      <div className="space-y-3 overflow-y-auto max-h-96">
        {projectTodos.length === 0 ? (
          <p className="py-4 text-sm text-center text-gray-500">
            No project tasks yet
          </p>
        ) : (
          projectTodos.map((todo) => (
            <ProjectTodoItem
              key={todo.todo_id}
              todo={todo}
              isEditing={editingTodoId === todo.todo_id}
              onEdit={() => setEditingTodoId(todo.todo_id)}
              onCancelEdit={() => setEditingTodoId(null)}
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
