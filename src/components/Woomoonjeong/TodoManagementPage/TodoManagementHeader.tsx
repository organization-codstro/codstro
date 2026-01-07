import React from "react";
import { Plus } from "lucide-react";

interface Props {
  onOpenModal: () => void;
}

const TodoManagementHeader: React.FC<Props> = ({ onOpenModal }) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">To-do Management</h1>
      <p className="text-gray-600">
        Manage your learning tasks and track progress
      </p>
    </div>
    <button
      onClick={onOpenModal}
      className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8]"
    >
      <Plus className="w-4 h-4" />
      Add Todo
    </button>
  </div>
);

export default TodoManagementHeader;
