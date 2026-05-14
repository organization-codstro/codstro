import { useState, useEffect, useRef, useCallback } from "react";
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
import {
  ChatMessageInteractionType,
  SendMessageParams,
} from "../../types/api/AiChat/ChatConversationPage";
import { ChatConversationService } from "../../api/AiChat/ChatConversationPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { CURSOR_PAGE_SIZE } from "../../constants/AiChat/AiChat";

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

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 새 메세지(실시간) 올 때만 아래로 스크롤
  const scrollToBottomIfNeeded = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // 이미 맨 아래 근처에 있을 때만 스크롤 (100px 이내)
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (isNearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  // 이전 메세지 로드 (위로 스크롤 시)
  const loadMoreMessages = useCallback(async () => {
    if (!hasMore || isLoadingMore || !roomId) return;
    setIsLoadingMore(true);

    const scrollEl = scrollRef.current;
    const prevScrollHeight = scrollEl?.scrollHeight ?? 0;

    try {
      const nextPage = page + 1;
      const older = await ChatConversationService.getMessages({
        roomId,
        limit: CURSOR_PAGE_SIZE,
        page: nextPage,
      });

      if (older.length === 0) {
        setHasMore(false);
        return;
      }

      setMessages((prev) => [...(older as ChatMessage[]), ...prev]);
      setPage(nextPage);
      setHasMore(older.length === CURSOR_PAGE_SIZE);

      // 스크롤 위치 유지 (새로 추가된 위쪽 메세지로 튀지 않게)
      requestAnimationFrame(() => {
        if (scrollEl) {
          scrollEl.scrollTop = scrollEl.scrollHeight - prevScrollHeight;
        }
      });
    } catch (err) {
      console.error("이전 메세지 로드 실패:", err);
      toast.error("이전 메세지를 불러오지 못했습니다.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, roomId, page]);

  // 스크롤 맨 위 도달 시 이전 메세지 로드
  const handleScroll = useCallback(() => {
    if (scrollRef.current?.scrollTop === 0) {
      loadMoreMessages();
    }
  }, [loadMoreMessages]);

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
          ChatConversationService.getMessages({
            roomId,
            limit: CURSOR_PAGE_SIZE,
            page: 1,
          }),
          ChatConversationService.getChatRoomAIPersonas({ roomId }),
        ]);

        if (cancelled) return;

        setRoom(roomInfo as ChatRoom);
        setMessages(messageHistory as ChatMessage[]);
        setPage(1);
        setHasMore(messageHistory.length === CURSOR_PAGE_SIZE);
        setPersonas(personaList);

        // 초기 로드 후 맨 아래로 스크롤
        requestAnimationFrame(() => {
          scrollToBottom();
        });

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
            // 실시간 메세지는 맨 아래 근처일 때만 스크롤
            scrollToBottomIfNeeded();
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
        navigate("/ai-chat");
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
    const regex = /@([^\s]+)/g;
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

      const hasText = !!inputValue.trim();
      const hasImage = uploadedUrls.length > 0;
      const hasEmoticon = !!emoticonId;

      const chat_message_format =
        hasText && (hasEmoticon || hasImage)
          ? "MULTIMODAL"
          : hasEmoticon || hasImage
            ? "IMG"
            : "TEXT";

      // 마지막 메세지 index 기준으로 다음 index 계산
      const lastIndex = messages[messages.length - 1]?.chat_message_index ?? 0;

      const payload: SendMessageParams = {
        chat_message_sender_type: "USER",
        chat_message_sender_agent_id: null,
        chat_message_content: inputValue.trim() || null,
        chat_message_index: lastIndex + 1,
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

      // 2. AI 응답 생성 요청 (fire & forget)
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

  if (isLoading || !room) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500">채팅 내용을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-gray-50">
      <ChatHeader
        roomName={room.chat_room_name}
        topics={room.chat_room_topics}
        onBack={() => navigate("/ai-chat")}
      />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto"
      >
        {/* 이전 메세지 로딩 표시 */}
        {isLoadingMore && (
          <div className="flex justify-center py-2 text-xs text-gray-400">
            이전 메시지 불러오는 중...
          </div>
        )}

        {/* 더 이상 이전 메세지 없음 */}
        {!hasMore && messages.length > 0 && (
          <div className="flex justify-center py-2 text-xs text-gray-300">
            가장 오래된 메시지입니다
          </div>
        )}

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
