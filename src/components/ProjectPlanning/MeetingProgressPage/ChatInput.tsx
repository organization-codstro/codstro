import { Send } from "lucide-react";
import { ChatInputProps } from "../../../types/pages/ProjectPlanning/MeetingProgressPage/ChatInput";

export const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      onSend();
    }
  };

  return (
    <div className="p-6 bg-white border-t border-gray-200">
      <div className="flex items-center max-w-6xl mx-auto space-x-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={onSend}
          className="p-3 text-white rounded-full bg-[#587CF0] hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
