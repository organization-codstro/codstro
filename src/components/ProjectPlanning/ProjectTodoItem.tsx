import React from "react";
import { Calendar, Trash2, X } from "lucide-react";
import { Todo } from "../../types/ProjectPlanning/project";

interface ProjectTodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (todoId: number, updates: Partial<Todo>) => void;
  onDelete: (todoId: number) => void;
  getStatusColor: (status: string) => string;
}

export const ProjectTodoItem: React.FC<ProjectTodoItemProps> = ({
  todo,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  getStatusColor,
}) => {
  return (
    <div
      className={`p-4 border rounded-lg transition-colors ${
        isEditing
          ? "border-blue-400 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => !isEditing && onEdit()}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={todo.todo_name}
            onChange={(e) =>
              onUpdate(todo.todo_id, { todo_name: e.target.value })
            }
            placeholder="Task name"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />

          <textarea
            value={todo.todo_content}
            onChange={(e) =>
              onUpdate(todo.todo_id, { todo_content: e.target.value })
            }
            placeholder="Task content"
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />

          <textarea
            value={todo.todo_description}
            onChange={(e) =>
              onUpdate(todo.todo_id, { todo_description: e.target.value })
            }
            placeholder="Task description"
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={todo.todo_start_date}
                onChange={(e) =>
                  onUpdate(todo.todo_id, {
                    todo_start_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={todo.todo_end_date}
                onChange={(e) =>
                  onUpdate(todo.todo_id, {
                    todo_end_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <select
              value={todo.todo_status}
              onChange={(e) =>
                onUpdate(todo.todo_id, {
                  todo_status: e.target.value as Todo["todo_status"],
                })
              }
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            >
              <option value="waiting">Waiting</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => onDelete(todo.todo_id)}
                className="p-2 text-red-600 rounded hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onCancelEdit}
                className="p-2 text-gray-600 rounded hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{todo.todo_name}</h4>
            <span
              className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                todo.todo_status
              )}`}
            >
              {todo.todo_status}
            </span>
          </div>

          <p className="mb-2 text-sm text-gray-600">{todo.todo_content}</p>
          <p className="mb-2 text-xs text-gray-500">{todo.todo_description}</p>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>
              {todo.todo_start_date} - {todo.todo_end_date}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
