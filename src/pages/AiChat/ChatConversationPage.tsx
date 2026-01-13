import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatRoom, ChatMessage } from "../../types/pages/AiChat/aiChat";
import { mockChatRooms, mockMessages } from "../../data/AiChat/mockData";
import { ChatHeader } from "../../components/AiChat/ChatConversation/ChatHeader";
import { MessageBubble } from "../../components/AiChat/ChatConversation/MessageBubble";
import { ChatInput } from "../../components/AiChat/ChatConversation/ChatInput";

export default function ChatConversationPage() {
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
    if (!room) navigate("/ai-chat");
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

  if (!room) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader
        roomName={room.chat_room_name}
        topics={room.chat_room_topics}
        onBack={() => navigate("/ai-chat")}
      />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <MessageBubble key={message.chat_message_id} message={message} />
        ))}
      </div>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
      />
    </div>
  );
}
