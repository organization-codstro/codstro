import { Smile, Send } from "lucide-react";
import { ChatInputProps } from "../../../types/pages/AiChat/ChatConversation/ChatInput";

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    // disabled 상태이거나 Enter 키가 아니면 무시
    if (disabled) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-end gap-2">
        <button
          className="p-2 text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-30"
          disabled={disabled}
        >
          <Smile size={24} />
        </button>

        <div
          className={`flex-1 px-4 py-2 rounded-3xl transition-colors ${
            disabled ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              disabled ? "AI가 응답 중입니다..." : "Type a message..."
            }
            className="w-full text-sm bg-transparent outline-none resize-none disabled:cursor-not-allowed"
            rows={1}
            style={{ maxHeight: "100px" }}
            disabled={disabled} // textarea 비활성화
          />
        </div>

        <button
          onClick={onSend}
          disabled={disabled || !value.trim()} // 전송 중이거나 값이 없으면 비활성화
          className="p-3 text-white transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#587CF0" }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
