import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFilesToStorage } from "../../db/firebase/firebase";

import { ChatHeader } from "../../components/AiChat/ChatConversation/ChatHeader";
import { MessageBubble } from "../../components/AiChat/ChatConversation/MessageBubble";
import { ChatInput } from "../../components/AiChat/ChatConversation/ChatInput/ChatInput";

import {
  ChatMessage,
  ChatRoom,
  ChatRoomAI,
  TypingPersona,
} from "../../types/common/AiChat";
import NotFoundPage from "../NotFound/NotFoundPage";
import {
  ChatMessageInteractionType,
  SendMessageParams,
} from "../../types/api/AiChat/ChatConversationPage";
import { ChatConversationService } from "../../api/AiChat/ChatConversationPage";
import { LoginService } from "../../api/Auth/LoginPage";

export default function ChatConversationPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [personas, setPersonas] = useState<ChatRoomAI[]>([]);
  const [typingPersonas, setTypingPersonas] = useState<TypingPersona[]>([]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let subscription: any = null;
    let typingSubscription: any = null;
    let cancelled = false;

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

        if (cancelled) return;

        setRoom(roomInfo as ChatRoom);
        setMessages(messageHistory as ChatMessage[]);
        setPersonas(personaList);

        subscription = ChatConversationService.subscribeToMessages({
          roomId,
          callback: (payload) => {
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

        typingSubscription = ChatConversationService.subscribeToTyping({
          roomId,
          onTypingStart: (incomingPersonas) => {
            setTypingPersonas(incomingPersonas);
          },
          onTypingEnd: (chat_room_ai_id) => {
            setTypingPersonas((prev) =>
              prev.filter((t) => t.chat_room_ai_id !== chat_room_ai_id),
            );
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

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
      typingSubscription?.unsubscribe();
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

      //  format 결정 로직
      const hasText = !!inputValue.trim();
      const hasImage = uploadedUrls.length > 0;
      const hasEmoticon = !!emoticonId;

      const chat_message_format =
        hasText && (hasEmoticon || hasImage)
          ? "MULTIMODAL"
          : hasEmoticon || hasImage
            ? "IMG"
            : "TEXT";

      const payload: SendMessageParams = {
        chat_message_sender_type: "USER",
        chat_message_sender_agent_id: null,
        chat_message_content: inputValue.trim() || null,
        chat_message_index: messages.length + 1,
        emoticon_id: emoticonId ?? null,
        chat_room_id: roomId!,
        chat_message_file_content_path:
          uploadedUrls.length > 0 ? uploadedUrls : null,
        chat_message_format,
        chat_message_interaction_type: interactionType,
        chat_message_reply_message_id: replyingTo?.chat_message_id ?? null,
        chat_message_reply_target_agent_id:
          replyingTo?.chat_message_sender_agent_id ?? null,
        chat_message_mention_target_agent_id:
          mentionTargetAgent?.chat_room_ai_id ?? null,
      };

      // 1. 유저 메시지 저장
      await ChatConversationService.sendMessage(payload);

      // 2. AI 응답 생성 요청 (fire & forget - 브로드캐스트로 타이핑 표시)
      ChatConversationService.requestAiResponse({
        chat_room_id: roomId!,
        userMessage: payload,
      }).catch((err) => {
        console.error("AI 응답 요청 실패:", err);
        toast.error("AI 응답 생성에 실패했습니다.");
        setTypingPersonas([]);
      });

      setInputValue("");
      setImages([]);
      setReplyingTo(null);
    } catch (error) {
      console.error("전송 실패:", error);
      toast.error("메시지 전송에 실패했습니다.");
      setTypingPersonas([]);
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

      {/* 타이핑 표시 */}
      {typingPersonas.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400">
          <span>
            {typingPersonas.map((t) => t.persona_name).join(", ")}
            {typingPersonas.length === 1 ? "이 " : "이 "}
            입력 중입니다
          </span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        </div>
      )}

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
