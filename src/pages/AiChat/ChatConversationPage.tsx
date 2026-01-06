import { useState, useEffect } from "react";
import { ArrowLeft, Send, Smile } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatRoom, ChatMessage } from "../../types/AiChat/aiChat";
import { mockChatRooms, mockMessages } from "../../data/AiChat/mockData";

export default function ChatConversation() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const roomIdNum = Number(roomId);

  const room: ChatRoom | undefined = mockChatRooms.find(
    (r) => r.chat_room_id === roomIdNum
  );
  const [messages, setMessages] = useState<ChatMessage[]>(
    mockMessages[roomIdNum] || []
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!room) {
      // 잘못된 roomId이면 목록으로 이동
      navigate("/ai-chat");
    }
  }, [room, navigate]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      chat_message_id: Date.now(),
      chat_message_sender: "USER",
      chat_message_content: inputValue,
      chat_message_sent_at: new Date().toISOString(),
      daily_chat_rooms_id: roomIdNum,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // AI 답장 시뮬레이션
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        chat_message_id: Date.now() + 1,
        chat_message_sender: "AI",
        chat_message_content:
          "Thanks for your message! This is a simulated response.",
        chat_message_sent_at: new Date().toISOString(),
        daily_chat_rooms_id: roomIdNum,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!room) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/ai-chat")}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div
            className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full"
            style={{ backgroundColor: "#587CF0" }}
          >
            {room.chat_room_name.charAt(0)}
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">
              {room.chat_room_name}
            </h2>
            <p className="text-sm text-gray-500">{room.chat_room_topics}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.chat_message_id}
            className={`flex ${
              message.chat_message_sender === "USER"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.chat_message_sender === "USER"
                  ? "text-white"
                  : "bg-white text-gray-800"
              }`}
              style={
                message.chat_message_sender === "USER"
                  ? { backgroundColor: "#587CF0" }
                  : {}
              }
            >
              <p className="text-sm">{message.chat_message_content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.chat_message_sender === "USER"
                    ? "text-blue-100"
                    : "text-gray-400"
                }`}
              >
                {new Date(message.chat_message_sent_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end gap-2">
          <button className="p-2 text-gray-400 transition-colors hover:text-gray-600">
            <Smile size={24} />
          </button>

          <div className="flex-1 px-4 py-2 bg-gray-100 rounded-3xl">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full text-sm bg-transparent outline-none resize-none"
              rows={1}
              style={{ maxHeight: "100px" }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-3 text-white transition-colors rounded-full disabled:opacity-50"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
