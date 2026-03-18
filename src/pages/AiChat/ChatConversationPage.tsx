import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ChatHeader } from "../../components/AiChat/ChatConversation/ChatHeader";
import { MessageBubble } from "../../components/AiChat/ChatConversation/MessageBubble";
import { ChatInput } from "../../components/AiChat/ChatConversation/ChatInput";
import { ChatConversationService } from "../../api/AiChat/ChatConversationPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { ChatMessage, ChatRoom, ChatRoomAI } from "../../types/common/aiChat";
import NotFoundPage from "../NotFound/NotFoundPage";
import {
  ChatMessageInteractionType,
  SendMessageParams,
} from "../../types/api/AiChat/ChatConversationPage";
import { uploadFilesToStorage } from "../../db/firebase/firebase";

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
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [personas, setPersonas] = useState<ChatRoomAI[]>([]);

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
    let subscription: any = null; // ← useEffect 스코프에 선언

    const initChat = async () => {
      setIsLoading(true);
      try {
        const currentUserId = await LoginService.getCurrentUserId();
        if (!currentUserId) {
          navigate("/login");
          return;
        }
        setUserId(currentUserId);
        if (!roomId) return;

        const [roomInfo, messageHistory, personaList] = await Promise.all([
          ChatConversationService.getRoomInfo({ roomId }),
          ChatConversationService.getMessages({ roomId }),
          ChatConversationService.getChatRoomAIPersonas({ roomId }),
        ]);

        setRoom(roomInfo as ChatRoom);
        setMessages(messageHistory as ChatMessage[]);
        setPersonas(personaList);

        // subscription을 바깥 변수에 할당
        subscription = ChatConversationService.subscribeToMessages({
          roomId,
          callback: (payload) => {
            console.log("[subscription] new message:", payload); // 로그 확인용
            const newMessage = payload.new as ChatMessage;
            setMessages((prev) => {
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
      } catch (error: any) {
        console.error(error);
        toast.error("채팅방을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initChat();

    // useEffect 레벨에서 cleanup → 이제 실제로 실행됨
    return () => {
      subscription?.unsubscribe();
    };
  }, [roomId, navigate]);

  const extractMentions = (text: string) => {
    const regex = /@(\w+)/g;
    const matches = [...text.matchAll(regex)];
    return matches.map((m) => m[1]);
  };

  const handleSend = async (
    emoticonId?: string,
    interactionType: ChatMessageInteractionType = "CASUAL",
  ) => {
    if (!emoticonId && !inputValue.trim() && images.length === 0) return;
    if (isSending) return;

    setIsSending(true);
    try {
      const mentions = extractMentions(inputValue);
      const mentionTargetAgent = mentions[0]
        ? personas.find((p) => p.ai_persona_name === mentions[0])
        : null;

      let uploadedUrls: string[] = [];
      if (images.length > 0) {
        const results = await uploadFilesToStorage(
          images,
          `aichat-assets/${roomId}`,
        );
        uploadedUrls = results.map((r) => r.url);
      }

      const payload: SendMessageParams = {
        chat_message_sender_type: "USER",
        chat_message_sender_agent_id: null,
        chat_message_content: emoticonId ? null : inputValue.trim() || null,
        chat_message_index: messages.length + 1,
        emoticon_id: emoticonId ?? null,
        chat_room_id: roomId!,
        chat_message_file_content_path:
          uploadedUrls.length > 0 ? uploadedUrls : null,
        chat_message_format: emoticonId ? "EMOTICON" : "TEXT",
        chat_message_interaction_type: interactionType,
        chat_message_reply_message_id: replyingTo?.chat_message_id ?? null,
        chat_message_reply_target_agent_id:
          replyingTo?.chat_message_sender_agent_id ?? null,
        chat_message_mention_target_agent_id:
          mentionTargetAgent?.chat_room_ai_id ?? null,
      };

      // 1. 유저 메시지 저장
      await ChatConversationService.sendMessage(payload);

      // 2. AI 응답 생성 요청 (fire & forget - AI 응답은 구독으로 받음)
      ChatConversationService.requestAiResponse({
        chat_room_id: roomId!,
        userMessage: payload,
      }).catch((err) => {
        console.error("AI 응답 요청 실패:", err);
        toast.error("AI 응답 생성에 실패했습니다.");
      });

      setInputValue("");
      setImages([]);
      setReplyingTo(null);
    } catch (error) {
      console.error("전송 실패:", error);
      toast.error("메시지 전송에 실패했습니다.");
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

  if (!room) return <NotFoundPage />;

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-gray-50">
      <ChatHeader
        roomName={room.chat_room_name}
        topics={room.chat_room_topics}
        onBack={() => navigate("/ai-chat")}
      />

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto"
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble
              key={message.chat_message_id}
              message={message}
              onReply={(msg) => setReplyingTo(msg)}
              personas={personas}
              allMessages={messages}
            />
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
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
        images={images}
        setImages={setImages}
        personas={personas}
      />
    </div>
  );
}
