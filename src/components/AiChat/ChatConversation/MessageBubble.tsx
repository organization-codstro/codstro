import { MessageBubbleProps } from "../../../types/pages/AiChat/ChatConversation/MessageBubble";

// export function MessageBubble({ message, onReply }: MessageBubbleProps) {
//   const isUser = message.chat_message_sender_type === "USER";

//   const fakeAiNames = ["Luna", "Atlas", "Nova"];

//   const aiName =
//     message.chat_message_sender_type === "AI"
//       ? fakeAiNames[message.chat_message_index % fakeAiNames.length]
//       : "You";

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`max-w-md p-3 rounded-lg shadow-sm ${
//           isUser ? "bg-blue-500 text-white" : "bg-white text-gray-800"
//         }`}
//       >
//         {/* AI 이름 */}
//         {!isUser && (
//           <div className="mb-1 text-sm font-semibold text-blue-500">
//             {aiName}
//           </div>
//         )}

//         {/* Reply 표시 */}
//         {message.chat_message_reply_message && (
//           <div className="p-2 mb-2 text-xs text-gray-600 bg-gray-100 rounded">
//             Replying to message #{message.chat_message_reply_message}
//             {/* TODO: 실제 reply 메시지 내용 연결 */}
//           </div>
//         )}

//         {/* 메시지 내용 */}
//         <div className="break-words whitespace-pre-wrap">
//           {message.chat_message_content}
//         </div>

//         {/* 이미지 표시 (UI만) */}
//         {/* TODO: 실제 이미지 데이터 연결 */}
//         {message.chat_message_file_content_url &&
//           message.chat_message_file_content_url.length > 0 && (
//             <div className="mt-2 space-y-2">
//               {message.chat_message_file_content_url.map(
//                 (img: string, i: number) => (
//                   <img
//                     key={i}
//                     src={img}
//                     className="object-cover rounded-lg max-h-60"
//                   />
//                 ),
//               )}
//             </div>
//           )}

//         <div className="flex items-center justify-between mt-2">
//           <span
//             className={`text-xs ${isUser ? "text-blue-100" : "text-gray-400"}`}
//           >
//             {new Date(message.created_at).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>

//           {onReply && (
//             <button
//               className={`text-xs ml-3 ${
//                 isUser ? "text-blue-100" : "text-gray-400"
//               } hover:underline`}
//               onClick={() => onReply(message)}
//             >
//               Reply
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export function MessageBubble({
  message,
  onReply,
  personas = [],
  allMessages = [],
}: MessageBubbleProps) {
  const isUser = message.chat_message_sender_type === "USER";

  // AI 이름: sender_agent_id로 personas에서 찾기
  const aiPersona = personas.find(
    (p) => p.chat_room_ai_id === message.chat_message_sender_agent_id,
  );
  const senderName = isUser ? "You" : (aiPersona?.ai_persona_name ?? "AI");

  // 답장 원본 메시지 찾기
  const replyOriginMessage = message.chat_message_reply_message_id
    ? allMessages.find(
        (m) => m.chat_message_id === message.chat_message_reply_message_id,
      )
    : null;

  // 답장 대상 AI 이름
  const replyTargetPersona = personas.find(
    (p) => p.chat_room_ai_id === message.chat_message_reply_target_agent_id,
  );

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md p-3 rounded-lg shadow-sm ${
          isUser ? "bg-blue-500 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* 발신자 이름 */}
        {!isUser && (
          <div className="mb-1 text-sm font-semibold text-blue-500">
            {senderName}
          </div>
        )}

        {/* 답장 원본 미리보기 */}
        {replyOriginMessage && (
          <div className="p-2 mb-2 text-xs text-gray-600 bg-gray-100 border-l-2 border-blue-400 rounded">
            {replyTargetPersona && (
              <span className="mr-1 font-semibold text-blue-500">
                @{replyTargetPersona.ai_persona_name}
              </span>
            )}
            <span className="line-clamp-2">
              {replyOriginMessage.chat_message_content ?? "(내용 없음)"}
            </span>
          </div>
        )}

        {/* 멘션 표시 */}
        {message.chat_message_mention_target_agent_id && (
          <div className="mb-1 text-xs text-blue-300">
            @
            {personas.find(
              (p) =>
                p.chat_room_ai_id ===
                message.chat_message_mention_target_agent_id,
            )?.ai_persona_name ?? "Unknown"}
          </div>
        )}

        {/* 메시지 내용 */}
        <div className="break-words whitespace-pre-wrap">
          {message.chat_message_content ?? (
            <span className="italic text-gray-400">(내용 없음)</span>
          )}
        </div>

        {/* 이미지 표시 */}
        {message.chat_message_file_content_url &&
          message.chat_message_file_content_url.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.chat_message_file_content_url.map(
                (img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={`첨부 이미지 ${i + 1}`}
                    className="object-cover rounded-lg max-h-60"
                  />
                ),
              )}
            </div>
          )}

        {/* 하단 바: 시간 + Reply 버튼 */}
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-xs ${isUser ? "text-blue-100" : "text-gray-400"}`}
          >
            {message.created_at
              ? new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
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
