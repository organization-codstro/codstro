import { ProjectChatMessageProps } from "../../../types/pages/ProjectPlanning/ProjectCreateChatPage/ProjectChatMessage";
import { MarkdownRenderer } from "../../Markdown/MarkdownRenderer";

export const ProjectChatMessage = ({
  sender,
  message,
}: ProjectChatMessageProps) => {
  console.log(message);
  const isUser = sender === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl px-6 py-4 rounded-2xl ${
          isUser
            ? "text-white"
            : "bg-white border border-gray-200 text-gray-900"
        }`}
        style={isUser ? { backgroundColor: "#587CF0" } : {}}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message}</p>
        ) : (
          <MarkdownRenderer content={message} />
        )}
      </div>
    </div>
  );
};
