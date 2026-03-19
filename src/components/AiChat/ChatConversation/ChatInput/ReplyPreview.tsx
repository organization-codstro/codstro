import { ReplyPreviewProps } from "../../../../types/pages/AiChat/ChatConversation/ChatInput/ReplyPreview";

export function ReplyPreview({ replyingTo, onCancel }: ReplyPreviewProps) {
  return (
    <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-blue-50 rounded-lg border-l-4 border-blue-400">
      <span className="flex-1 text-xs text-gray-600 truncate">
        {replyingTo.chat_message_content ?? "(이모티콘 메시지)"}
      </span>
      <button
        onClick={onCancel}
        className="text-xs text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  );
}
