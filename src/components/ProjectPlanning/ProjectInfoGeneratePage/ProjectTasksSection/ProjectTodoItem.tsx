import React from "react";
import { Calendar, Trash2, X, Check } from "lucide-react";
import { Todo } from "../../../../types/pages/ProjectPlanning/project";
import { ProjectTodoItemProps } from "../../../../types/pages/ProjectPlanning/ProjectInfoGeneratePage/ProjectTasksSection/ProjectTodoItem";

export const ProjectTodoItem: React.FC<ProjectTodoItemProps> = ({
  todo,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  getStatusColor,
}) => {
  const [editedTodo, setEditedTodo] = React.useState<Todo>(todo);

  React.useEffect(() => {
    setEditedTodo(todo);
  }, [todo, isEditing]);

  const handleSave = () => {
    onUpdate(todo.id, editedTodo);
    onCancelEdit();
  };

  const handleCancel = () => {
    setEditedTodo(todo);
    onCancelEdit();
  };

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
            value={editedTodo.name}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, name: e.target.value })
            }
            placeholder="Task name"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            onClick={(e) => e.stopPropagation()}
          />

          <textarea
            value={editedTodo.content}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, content: e.target.value })
            }
            placeholder="Task content"
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            onClick={(e) => e.stopPropagation()}
          />

          <textarea
            value={editedTodo.description}
            onChange={(e) =>
              setEditedTodo({
                ...editedTodo,
                description: e.target.value,
              })
            }
            placeholder="Task description"
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={editedTodo.start_date}
                onChange={(e) =>
                  setEditedTodo({
                    ...editedTodo,
                    start_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={editedTodo.end_date}
                onChange={(e) =>
                  setEditedTodo({
                    ...editedTodo,
                    end_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <select
              value={editedTodo.status}
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  status: e.target.value as Todo["status"],
                })
              }
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="waiting">Waiting</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    onDelete(todo.id);
                  }
                }}
                className="p-2 text-red-600 rounded hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="p-2 text-gray-600 rounded hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="p-2 text-green-600 rounded hover:bg-green-50"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{todo.name}</h4>
            <span
              className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                todo.start_date
              )}`}
            >
              {todo.start_date}
            </span>
          </div>

          <p className="mb-2 text-sm text-gray-600">{todo.content}</p>
          <p className="mb-2 text-xs text-gray-500">{todo.description}</p>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>
              {todo.start_date} - {todo.end_date}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
