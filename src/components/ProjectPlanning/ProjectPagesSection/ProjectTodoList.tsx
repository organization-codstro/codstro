import React from "react";
import { Todo } from "../../../types/pages/ProjectPlanning/project";
import { ProjectTodoItem } from "./ProjectTodoItem";
import { ProjectTodoListProps } from "../../../types/pages/ProjectPlanning/ProjectPagesSection/ProjectTodoList";

export const ProjectTodoList: React.FC<ProjectTodoListProps> = ({
  isEditing,
  pageId,
  todos,
  editingTodoId,
  deletePendingId,
  getStatusColor,
  onAddTodo,
  onUpdateTodoField,
  onStartEditTodo,
  onSaveTodo,
  onCancelEditTodo,
  onDeleteTodoAction,
}) => {
  const handleAddNewTodo = () => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      name: "New Task",
      content: "",
      description: "",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
      project_page_id: pageId,
    };
    onAddTodo?.(pageId, newTodo);
  };

  return (
    <div className="pt-3 border-t border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-gray-500">
          Tasks ({todos.length})
        </p>
        {isEditing && (
          <button
            type="button"
            onClick={handleAddNewTodo}
            className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            + Add Task
          </button>
        )}
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <ProjectTodoItem
            key={todo.id}
            todo={todo}
            isEditingTodo={
              editingTodoId?.pageId === pageId &&
              editingTodoId?.todoId === todo.id
            }
            isTodoPending={deletePendingId === todo.id}
            canEdit={isEditing}
            getStatusColor={getStatusColor}
            onUpdateField={(f, v) => onUpdateTodoField(todo.id, f, v)}
            onStartEdit={() => onStartEditTodo(todo.id)}
            onSave={() => onSaveTodo(todo.id, todo)}
            onCancel={onCancelEditTodo}
            onDelete={(e) => onDeleteTodoAction(e, todo.id)}
          />
        ))}
      </div>
    </div>
  );
};
