import { ChatMessageProps } from "../../../types/pages/ProjectPlanning/MeetingProgressPage/ChatMessage";
import ReactMarkdown from "react-markdown";

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
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
          ) : (
            <div className="text-sm leading-relaxed prose-sm prose max-w-none prose-p:my-1 prose-ul:my-1 prose-ul:pl-4 prose-ol:my-1 prose-ol:pl-4 prose-li:my-0 prose-strong:font-semibold prose-headings:font-semibold prose-headings:my-2 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded-lg">
              <ReactMarkdown>{message.message}</ReactMarkdown>
            </div>
          )}
        </div>
        <p className="px-2 mt-1 text-xs text-gray-500">{message.create_at}</p>
      </div>
    </div>
  );
};
