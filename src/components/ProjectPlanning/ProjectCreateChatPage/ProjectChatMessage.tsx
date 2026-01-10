import { ProjectChatMessageProps } from "../../../types/pages/ProjectPlanning/ProjectCreateChatPage/ProjectChatMessage";

export const ProjectChatMessage = ({ sender, message }: ProjectChatMessageProps) => {
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
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};
