import { MessageModeToggleProps } from "../../../../types/pages/AiChat/ChatConversation/ChatInput/MessageModeToggle";

export function MessageModeToggle({ mode, onChange }: MessageModeToggleProps) {
  return (
    <div
      className="relative flex items-center overflow-hidden border border-blue-500 rounded-full cursor-pointer select-none"
      onClick={() => onChange(mode === "CASUAL" ? "ACTION_REQUEST" : "CASUAL")}
    >
      <div
        className="absolute top-0 bottom-0 transition-all duration-300 ease-in-out bg-blue-500 rounded-full"
        style={{
          left: mode === "CASUAL" ? "0%" : "40%",
          width: mode === "CASUAL" ? "40%" : "100%",
        }}
      />
      <span
        className="relative z-10 px-4 py-1 text-xs font-bold transition-colors duration-300 whitespace-nowrap"
        style={{
          color: mode === "CASUAL" ? "white" : "#3B82F6",
          minWidth: "80px",
          textAlign: "center",
        }}
      >
        CASUAL
      </span>
      <span
        className="relative z-10 px-4 py-1 text-xs font-bold transition-colors duration-300 whitespace-nowrap"
        style={{
          color: mode === "ACTION_REQUEST" ? "white" : "#3B82F6",
          minWidth: "120px",
          textAlign: "center",
        }}
      >
        ACTION_REQUEST
      </span>
    </div>
  );
}
