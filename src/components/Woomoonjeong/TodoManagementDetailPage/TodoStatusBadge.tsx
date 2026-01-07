import React from "react";
import { CheckCircle2, PlayCircle, Circle } from "lucide-react";
import { TodoStatusBadgeProps } from "../../../types/Woomoonjeong/TodoManagementDetailPage/TodoStatusBadge";



const TodoStatusBadge: React.FC<TodoStatusBadgeProps> = ({ status }) => {
  const config = {
    completed: {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      style: "bg-green-100 text-green-700 border-green-200",
    },
    "in-progress": {
      icon: <PlayCircle className="w-5 h-5 text-blue-500" />,
      style: "bg-blue-100 text-blue-700 border-blue-200",
    },
    pending: {
      icon: <Circle className="w-5 h-5 text-gray-400" />,
      style: "bg-gray-100 text-gray-700 border-gray-200",
    },
  };

  const { icon, style } = config[status] || config.pending;

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className={`px-3 py-1 text-sm rounded-full border ${style}`}>
        {status.replace("-", " ")}
      </span>
    </div>
  );
};

export default TodoStatusBadge;
