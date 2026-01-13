import React from "react";
import {
  CheckCircle2,
  PlayCircle,
  Circle,
  Calendar,
  Trash2,
  Check,
} from "lucide-react";
import { TodoCardProps } from "../../../types/pages/Woomoonjeong/TodoManagementPage/TodoCard";
import { Todo } from "../../../types/pages/Woomoonjeong/woomoonjeong";

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  isDeletePending,
  onNavigate,
  onToggleStatus,
  onDeleteClick,
}) => {
  const getStatusIcon = (status: Todo["status"]) => {
    if (status === "completed")
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (status === "in-progress")
      return <PlayCircle className="w-5 h-5 text-blue-500" />;
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (status: Todo["status"]) => {
    if (status === "completed")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "in-progress")
      return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div
      onClick={onNavigate}
      className={`flex items-start gap-4 p-4 transition-all border-2 rounded-lg cursor-pointer ${
        isDeletePending
          ? "bg-red-50 border-red-200"
          : "bg-gray-50 border-transparent hover:bg-gray-100"
      }`}
    >
      <div className="mt-1">{getStatusIcon(todo.status)}</div>
      <div className="flex-1">
        <h3
          className={`font-medium ${
            isDeletePending ? "text-red-700" : "text-gray-800"
          }`}
        >
          {todo.name}
        </h3>
        <p className="max-w-md text-sm text-gray-600 truncate">
          {todo.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" /> {todo.start_date} ~ {todo.end_date}
          </div>
          <span
            className={`px-2 py-0.5 rounded-full border text-[10px] ${getStatusColor(
              todo.status
            )}`}
          >
            {todo.status.replace("-", " ")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={onToggleStatus}
          className="p-2 text-gray-400 hover:text-blue-500"
        >
          <PlayCircle className="w-4 h-4" />
        </button>
        <button
          onClick={onDeleteClick}
          className={`p-2 rounded-lg transition-all ${
            isDeletePending
              ? "bg-red-500 text-white"
              : "text-gray-400 hover:text-red-500"
          }`}
        >
          {isDeletePending ? (
            <Check className="w-4 h-4" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
