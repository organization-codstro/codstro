import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  CreditCard as Edit3,
} from "lucide-react";
import {
  todosData,
  woomoonjeongData,
} from "../../data/woomoonjeong/woomoonjeongData";
import { Todo } from "../../types/Woomoonjeong/woomoonjeong";

const TodoManagementDetail: React.FC = () => {
  const { todoId } = useParams<{ todoId: string }>();
  const navigate = useNavigate();

  const todo = todosData.find((t) => t.id === Number(todoId));
  const relatedField = woomoonjeongData.find(
    (field) => field.id === todo?.field_id
  );

  if (!todo) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Todo not found.</p>
        <button
          onClick={() => navigate("/woomoonjeong")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  const getStatusIcon = (status: Todo["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Todo["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const diffDays = (() => {
    const start = new Date(todo.start_date);
    const end = new Date(todo.end_date);
    return Math.ceil(
      Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  })();

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/woomoonjeong")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">Todo Details</h1>
            <p className="text-gray-600">View your todo item</p>
          </div>
          <button
            onClick={() => navigate(`/woomoonjeong/todo/${todo.id}/edit`)}
            className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit Todo
          </button>
        </div>

        {/* Detail Card */}
        <div className="p-8 space-y-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          {/* Status & Field */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(todo.status)}
              <span
                className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(
                  todo.status
                )}`}
              >
                {todo.status.replace("-", " ")}
              </span>
            </div>
            {relatedField && (
              <span className="px-3 py-1 text-sm text-blue-700 border border-blue-200 rounded-full bg-blue-50">
                {relatedField.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">{todo.name}</h2>

          {/* Description */}
          <div>
            <h3 className="mb-2 font-semibold text-gray-800">Description</h3>
            <p className="text-gray-600">
              {todo.description || "No description provided."}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-gray-800">Start Date</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(todo.start_date).toLocaleDateString()}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-800">End Date</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(todo.end_date).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="mb-2 font-semibold text-gray-800">Duration</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              {diffDays} day{diffDays !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Created */}
          <div>
            <h3 className="mb-2 font-semibold text-gray-800">Created</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              {new Date(todo.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoManagementDetail;
