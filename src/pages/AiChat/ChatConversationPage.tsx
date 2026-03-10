import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ChatHeader } from "../../components/AiChat/ChatConversation/ChatHeader";
import { MessageBubble } from "../../components/AiChat/ChatConversation/MessageBubble";
import { ChatInput } from "../../components/AiChat/ChatConversation/ChatInput";
import {
  AiResponseService,
  ChatConversationService,
} from "../../api/AiChat/ChatConversationPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { ChatMessage, ChatRoom } from "../../types/common/aiChat";

export default function ChatConversationPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // -- 상태 관리 (State) --
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // 스크롤 하단 이동
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // -- 데이터 초기화 및 실시간 구독 (Lifecycle) --
  useEffect(() => {
    if (!roomId) {
      toast.error("잘못된 접근입니다.");
      navigate("/ai-chat");
      return;
    }

    const initChat = async () => {
      setIsLoading(true);
      try {
        // 1. 유저 확인
        const currentUserId = await LoginService.getCurrentUserId();
        if (!currentUserId) {
          navigate("/login");
          return;
        }
        setUserId(currentUserId);

        // 2. 방 정보 및 메시지 이력 병렬 로드
        const [roomInfo, messageHistory] = await Promise.all([
          ChatConversationService.getRoomInfo({ roomId }),
          ChatConversationService.getMessages({ roomId }),
          //ChatConversationService.markAsRead({ roomId }), // 진입 시 읽음 처리
        ]);

        setRoom(roomInfo as ChatRoom);
        setMessages(messageHistory as ChatMessage[]);

        // 3. 실시간 구독 설정
        const subscription = ChatConversationService.subscribeToMessages({
          roomId,
          callback: (payload) => {
            const newMessage = payload.new as ChatMessage;
            setMessages((prev) => {
              // 중복 방지 로직 (내가 보낸 메시지가 즉시 반영되었을 경우 대비)
              if (
                prev.find(
                  (m) => m.chat_message_id === newMessage.chat_message_id,
                )
              )
                return prev;
              return [...prev, newMessage];
            });
          },
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error: any) {
        console.error(error);
        toast.error("채팅방을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [roomId, navigate]);

  // -- 메시지 전송 및 AI 응답 로직 --
  const handleSend = async () => {
    if (!inputValue.trim() || !roomId || !userId || isSending) return;

    const currentInput = inputValue;
    setInputValue("");
    setIsSending(true);

    try {
      // 1. 유저 메시지 전송
      const nextIndex =
        messages.length > 0
          ? messages[messages.length - 1].chat_message_index + 1
          : 0;
      const sentMessage = await ChatConversationService.sendMessage({
        roomId,
        content: currentInput,
        sender: "USER",
        nextIndex,
      });

      // 낙관적 업데이트 대신 구독을 통해 받거나, 즉각적인 반응을 위해 수동 추가 가능
      // 여기서는 구독이 처리하므로 별도 setMessages는 생략 가능하지만 중복체크 로직이 있다면 추가해도 무방

      // 2. AI 응답 생성 (Gemini)
      // *주의: persona 정보는 실제 서비스 구현 시 roomInfo 등에서 확장해서 가져와야 함
      // 현재는 서비스 인터페이스에 맞춰 가상의 persona 객체 전달
      const aiReplyContent = await AiResponseService.generateAiReply({
        roomId,
        userMessage: currentInput,
        persona: {
          ai_persona_name: room?.chat_room_name || "AI",
          ai_persona_personality: "친절하고 따뜻한",
          ai_persona_speech_style: "반말",
          user_ai_setting_emotion: "Normal",
        },
      });

      // 3. AI 메시지 DB 저장
      await ChatConversationService.sendMessage({
        roomId,
        content: aiReplyContent,
        sender: "AI",
        nextIndex: nextIndex + 1,
      });
    } catch (error: any) {
      toast.error("메시지 전송 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500">채팅 내용을 불러오는 중...</p>
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader
        roomName={room.chat_room_name}
        topics={room.chat_room_topics}
        onBack={() => navigate("/ai-chat")}
      />

      <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble key={message.chat_message_id} message={message} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            대화를 시작해보세요!
          </div>
        )}
      </div>
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        disabled={isSending}
      />
    </div>
  );
}
