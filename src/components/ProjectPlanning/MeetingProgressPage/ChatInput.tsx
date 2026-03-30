import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { ChatInputProps } from "../../../types/pages/ProjectPlanning/MeetingProgressPage/ChatInput";

export const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`; // 4줄 max (36px * 4)
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-6 bg-white border-t border-gray-200">
      <div className="flex items-end max-w-6xl mx-auto space-x-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 px-6 py-3 overflow-y-auto border border-gray-300 resize-none rounded-2xl focus:outline-none focus:border-blue-400"
          style={{ lineHeight: "1.5" }}
        />
        <button
          onClick={onSend}
          className="p-3 mb-0 text-white rounded-full bg-[#587CF0] hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
