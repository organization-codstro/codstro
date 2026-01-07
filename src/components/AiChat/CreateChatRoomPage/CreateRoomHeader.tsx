import { ArrowLeft } from "lucide-react";
import { CreateRoomHeaderProps } from "../../../types/AiChat/CreateChatRoomPage/CreateRoomHeader";

export function CreateRoomHeader({ step, onBack }: CreateRoomHeaderProps) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create Chat Room</h1>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`flex-1 h-1 rounded-full transition-opacity ${
            step >= 1 ? "opacity-100" : "opacity-30"
          }`}
          style={{ backgroundColor: "#587CF0" }}
        ></div>
        <div
          className={`flex-1 h-1 rounded-full transition-opacity ${
            step >= 2 ? "opacity-100" : "opacity-30"
          }`}
          style={{ backgroundColor: "#587CF0" }}
        ></div>
      </div>
    </div>
  );
}
