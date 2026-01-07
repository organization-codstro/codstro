import { ChatMessage } from "../../../types/AiChat/aiChat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.chat_message_sender === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isUser ? "text-white" : "bg-white text-gray-800 shadow-sm"
        }`}
        style={isUser ? { backgroundColor: "#587CF0" } : {}}
      >
        <p className="text-sm whitespace-pre-wrap">
          {message.chat_message_content}
        </p>
        <p
          className={`text-[10px] mt-1 ${
            isUser ? "text-blue-100 text-right" : "text-gray-400"
          }`}
        >
          {new Date(message.chat_message_sent_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
