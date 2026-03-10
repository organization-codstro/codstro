import { ArrowLeft } from "lucide-react";
import { ChatHeaderProps } from "../../../types/pages/AiChat/ChatConversation/ChatHeader";

export function ChatHeader({ roomName, topics, onBack }: ChatHeaderProps) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div
          className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full shrink-0"
          style={{ backgroundColor: "#587CF0" }}
        >
          {roomName.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-900 truncate">{roomName}</h2>
          <p className="text-sm text-gray-500 truncate">{topics.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
