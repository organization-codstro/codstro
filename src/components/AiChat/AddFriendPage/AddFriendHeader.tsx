import { ArrowLeft } from "lucide-react";
import { HeaderProps } from "../../../types/pages/AiChat/AddFriendPage/AddFriendHeader";

export const AddFriendHeader = ({ onBack }: HeaderProps) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add Friend</h1>
      </div>
    </div>
  );
};
