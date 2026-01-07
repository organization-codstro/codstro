import { Smile, Send } from "lucide-react";
import { ChatInputProps } from "../../../types/AiChat/ChatConversation/ChatInput";


export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-end gap-2">
        <button className="p-2 text-gray-400 transition-colors hover:text-gray-600">
          <Smile size={24} />
        </button>

        <div className="flex-1 px-4 py-2 bg-gray-100 rounded-3xl">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full text-sm bg-transparent outline-none resize-none"
            rows={1}
            style={{ maxHeight: "100px" }}
          />
        </div>

        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="p-3 text-white transition-colors rounded-full disabled:opacity-50"
          style={{ backgroundColor: "#587CF0" }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
