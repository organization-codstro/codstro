import { MessageBubbleProps } from "../../../types/pages/AiChat/ChatConversation/MessageBubble";

export function MessageBubble({ message, onReply }: MessageBubbleProps) {
  const isUser = message.chat_message_sender === "USER";

  const fakeAiNames = ["Luna", "Atlas", "Nova"];

  const aiName =
    message.chat_message_sender === "AI"
      ? fakeAiNames[message.chat_message_index % fakeAiNames.length]
      : "You";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md p-3 rounded-lg shadow-sm ${
          isUser ? "bg-blue-500 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* AI 이름 */}
        {!isUser && (
          <div className="text-sm font-semibold text-blue-500 mb-1">
            {aiName}
          </div>
        )}

        {/* Reply 표시 */}
        {message.chat_message_reply_to && (
          <div className="bg-gray-100 text-xs p-2 rounded mb-2 text-gray-600">
            Replying to message #{message.chat_message_reply_to}
            {/* TODO: 실제 reply 메시지 내용 연결 */}
          </div>
        )}

        {/* 메시지 내용 */}
        <div className="whitespace-pre-wrap break-words">
          {message.chat_message_content}
        </div>

        {/* 이미지 표시 (UI만) */}
        {/* TODO: 실제 이미지 데이터 연결 */}
        {message.chat_message_img_content_url &&
          message.chat_message_img_content_url.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.chat_message_img_content_url.map(
                (img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    className="rounded-lg max-h-60 object-cover"
                  />
                ),
              )}
            </div>
          )}

        <div className="flex justify-between items-center mt-2">
          <span
            className={`text-xs ${isUser ? "text-blue-100" : "text-gray-400"}`}
          >
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {onReply && (
            <button
              className={`text-xs ml-3 ${
                isUser ? "text-blue-100" : "text-gray-400"
              } hover:underline`}
              onClick={() => onReply(message)}
            >
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
