//개별 할 일 아이템 - 할 일의 내용 수정, 상태 변경, 날짜 선택을 담당
import React from "react";
import { Calendar, Edit2, Save, X, Trash2 } from "lucide-react";
import { TodoItemProps } from "../../../types/pages/ProjectPlanning/ProjectPagesSection/ProjectTodoItem";

export const ProjectTodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditingTodo,
  isTodoPending,
  canEdit,
  getStatusColor,
  onUpdateField,
  onStartEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="p-3 border border-gray-200 rounded">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          {isEditingTodo ? (
            <>
              <input
                type="text"
                value={todo.name}
                onChange={(e) => onUpdateField("name", e.target.value)}
                className="w-full px-2 py-1 mb-2 text-sm font-medium border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                value={todo.description}
                onChange={(e) => onUpdateField("description", e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-xs text-gray-600 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
              />
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-gray-900">
                {todo.name}
              </span>
              <p className="mt-1 text-xs text-gray-600">{todo.description}</p>
            </>
          )}
        </div>

        <div className="flex items-center ml-2 space-x-2">
          {isEditingTodo ? (
            <div className="flex items-center space-x-1">
              <select
                value={todo.status}
                onChange={(e) => onUpdateField("status", e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              >
                <option value="waiting">Waiting</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={onSave}
                className="p-1 text-green-600 rounded hover:bg-green-50"
              >
                <Save className="w-3 h-3" />
              </button>
              <button
                onClick={onCancel}
                className="p-1 text-gray-600 rounded hover:bg-gray-100"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <span
                className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                  todo.status
                )}`}
              >
                {todo.status}
              </span>
              {canEdit && (
                <button
                  onClick={onStartEdit}
                  className="p-1 text-gray-400 hover:text-blue-500"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={onDelete}
                className={`p-1 transition-all rounded ${
                  isTodoPending
                    ? "bg-red-500 text-white scale-110"
                    : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditingTodo ? (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="block mb-1 text-xs text-gray-500">
              Start Date
            </label>
            <input
              type="date"
              value={todo.start_date}
              onChange={(e) => onUpdateField("start_date", e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs text-gray-500">End Date</label>
            <input
              type="date"
              value={todo.end_date}
              onChange={(e) => onUpdateField("end_date", e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>
            {todo.start_date} - {todo.end_date}
          </span>
        </div>
      )}
    </div>
  );
};
