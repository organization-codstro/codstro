import { ChatMessageProps } from "../../../types/pages/ProjectPlanning/MeetingProgressPage/ChatMessage";

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-3xl ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block px-6 py-4 rounded-2xl ${
            isUser
              ? "text-white bg-[#587CF0]"
              : "bg-white border border-gray-200 text-gray-900"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.message}
          </p>
        </div>
        <p className="px-2 mt-1 text-xs text-gray-500">{message.create_at}</p>
      </div>
    </div>
  );
};
