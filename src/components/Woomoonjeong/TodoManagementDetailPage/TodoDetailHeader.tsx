import React from "react";
import { ArrowLeft, CreditCard as Edit3 } from "lucide-react";
import { TodoDetailHeaderProps } from "../../../types/pages/Woomoonjeong/TodoManagementDetailPage/TodoDetailHeader";

const TodoDetailHeader: React.FC<TodoDetailHeaderProps> = ({
  onBack,
  onEdit,
}) => (
  <div className="flex items-center gap-4">
    <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100">
      <ArrowLeft className="w-5 h-5 text-gray-600" />
    </button>
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-gray-800">Todo Details</h1>
      <p className="text-gray-600">View your todo item</p>
    </div>
    <button
      onClick={onEdit}
      className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] flex items-center gap-2"
    >
      <Edit3 className="w-4 h-4" />
      Edit Todo
    </button>
  </div>
);

export default TodoDetailHeader;
