import { Send, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { ProjectChatInputProps } from "../../../types/pages/ProjectPlanning/ProjectCreateChatPage/ProjectChatInput";

export const ProjectChatInput = ({
  input,
  setInput,
  onSend,
  onNext,
  onBack,
  disabled,
}: ProjectChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 내용에 따라 높이 자동 조절 (최대 5줄)
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 줄바꿈 방지
      if (!disabled && input.trim()) {
        onSend();
      }
    }
    // Shift + Enter → 기본 동작(줄바꿈) 허용
  };

  return (
    <div className="p-6 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Chat Input Field */}
        <div className="flex items-end mb-4 space-x-4">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              disabled
                ? "AI가 응답을 생성하고 있습니다... (평균 소요 시간 5~8초)"
                : "Type your message..."
            }
            disabled={disabled}
            className="flex-1 px-6 py-3 overflow-hidden leading-relaxed transition-colors border border-gray-300 resize-none rounded-2xl focus:outline-none focus:border-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
          <button
            onClick={onSend}
            disabled={disabled || !input.trim()}
            className="flex-shrink-0 p-3 text-white transition-all rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            disabled={disabled}
            className="px-6 py-2 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>

          <button
            onClick={onNext}
            disabled={disabled}
            className="flex items-center px-6 py-2 space-x-2 font-medium text-white transition-all rounded-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#587CF0" }}
          >
            <span>Next: Generate Project Info</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
