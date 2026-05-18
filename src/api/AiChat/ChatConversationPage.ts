import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { CURSOR_PAGE_SIZE } from "../../constants/AiChat/AiChat";
import { supabase } from "../../db/supabase/supabase";
import {
  GetChatRoomAIPersonasParams,
  GetChatRoomAIPersonasResponse,
  GetEmoticonsParams,
  GetMessagesParams,
  GetRoomInfoParams,
  SendMessageParams,
  SubscribeToMessagesParams,
} from "../../types/api/AiChat/ChatConversationPage";
import { ChatMessage, ChatRoomAI, Emoticon } from "../../types/common/AiChat";

/**
 * 채팅방 관련 데이터 및 실시간 처리 서비스
 */
export const ChatConversationService = {
  /**
   * [채팅방 정보 조회]
   * - 채팅방 기본 정보 (이름, 주제 등) 조회
   */
  async getRoomInfo(params: GetRoomInfoParams) {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select("chat_room_id, chat_room_name, chat_room_topics")
      .eq("chat_room_id", params.roomId)
      .single();

    if (error) throw new Error(`[getRoomInfo Error]: ${error.message}`);
    return data;
  },

  /**
   * [이모티콘 목록 조회 - 페이지네이션]
   * - 키워드 검색 지원 (ilike)
   * - 최신순 정렬
   */
  async getEmoticons(
    params: GetEmoticonsParams,
  ): Promise<{ data: Emoticon[]; count: number }> {
    const from = (params.page - 1) * params.limit;
    const to = from + params.limit - 1;

    let query = supabase
      .from("emoticons")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    // 키워드 검색 필터
    if (params.keyword && params.keyword.trim() !== "") {
      query = query.ilike("emoticon_name", `%${params.keyword}%`);
    }

    const { data, count, error } = await query;
    if (error) throw error;

    return { data: data ?? [], count: count ?? 0 };
  },

  /**
   * [메시지 조회 + 읽음 처리]
   * - 해당 채팅방 메시지 전체 조회 (index 기준 오름차순)
   * - 조회 후 마지막 읽은 메시지 index 업데이트 (RPC)
   */
  async getMessages(params: GetMessagesParams) {
    const { roomId, limit = CURSOR_PAGE_SIZE, page = 1 } = params;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: messages, error: messageError } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("chat_room_id", roomId)
      .order("chat_message_index", { ascending: false }) // 최신순
      .range(from, to);

    if (messageError)
      throw new Error(`[getMessages Error]: ${messageError.message}`);

    // 읽음 처리
    await supabase.rpc("update_last_read", { room_id: roomId });

    return messages.reverse(); // 오래된 순으로 뒤집어서 반환
  },

  /**
   * [채팅방 AI 페르소나 목록 조회]
   * - RPC 통해 AI 캐릭터 목록 가져옴
   */
  async getChatRoomAIPersonas(
    params: GetChatRoomAIPersonasParams,
  ): Promise<GetChatRoomAIPersonasResponse[]> {
    const { roomId } = params;

    const { data, error } = await supabase.rpc("get_chat_room_ai_personas", {
      room_id: roomId,
    });

    if (error) {
      console.error("[getChatRoomAIPersonas RPC Error]:", error);
      throw error;
    }

    return (data as GetChatRoomAIPersonasResponse[]) || [];
  },

  /**
   * [메시지 전송]
   * - chat_messages 테이블에 메시지 INSERT
   * - insert 후 생성된 row 반환
   */
  async sendMessage(params: SendMessageParams) {
    const { data, error } = await supabase
      .from("chat_messages")
      .insert([
        {
          chat_room_id: params.chat_room_id,
          chat_message_sender_type: params.chat_message_sender_type,
          chat_message_sender_agent_id: params.chat_message_sender_agent_id,
          chat_message_content: params.chat_message_content,
          chat_message_file_content_path: params.chat_message_file_content_path,
          emoticon_id: params.emoticon_id,
          chat_message_format: params.chat_message_format,
          chat_message_index: params.chat_message_index,
          chat_message_interaction_type: params.chat_message_interaction_type,
          chat_message_reply_message_id: params.chat_message_reply_message_id,
          chat_message_reply_target_agent_id:
            params.chat_message_reply_target_agent_id,
          chat_message_mention_target_agent_id:
            params.chat_message_mention_target_agent_id,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(`[sendMessage Error]: ${error.message}`);
    return data;
  },

  /**
   * [AI 응답 요청]
   * - Supabase Edge Function 호출
   * - 실제 AI 응답 생성은 서버에서 비동기 처리
   */
  async requestAiResponse(params: {
    chat_room_id: string;
    userMessage: SendMessageParams;
  }) {
    const { error } = await supabase.functions.invoke("ai_chat-chat", {
      body: {
        chat_room_id: params.chat_room_id,
        userMessage: params.userMessage,
      },
    });

    if (error) throw new Error(`[requestAiResponse Error]: ${error.message}`);
  },

  /**
   * [메시지 실시간 구독]
   * - chat_messages INSERT 이벤트 감지
   * - 동일 채팅방 메시지만 필터링 후 callback 실행
   */
  subscribeToMessages(params: SubscribeToMessagesParams) {
    const channel = supabase
      .channel(`room_messages_${params.roomId}_${Date.now()}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload: RealtimePostgresInsertPayload<ChatMessage>) => {
          if (payload.new?.chat_room_id !== params.roomId) return;
          params.callback(payload);
        },
      )
      .subscribe((err) => {
        if (err) console.error("[subscription] error:", err);
      });

    return channel;
  },
  /**
   * [타이핑 상태 INSERT]
   * - 유저 메시지 직후 호출
   * - AI가 응답 준비 중임을 표시
   * - 여러 AI 페르소나에 대해 row 생성
   */
  async insertTypingStatus({
    roomId,
    personas,
  }: {
    roomId: string;
    personas: ChatRoomAI[];
  }) {
    const { error } = await supabase.from("typing_status").insert(
      personas.map((p) => ({
        chat_room_id: roomId,
        chat_room_ai_id: p.chat_room_ai_id,
        persona_name: p.ai_persona_name,
      })),
    );

    if (error) console.error("[insertTypingStatus Error]:", error);
  },

  /**
   * [타이핑 상태 실시간 구독]
   * - typing_status DELETE 이벤트만 감지
   * - AI 응답 완료 시 row 삭제 → 타이핑 종료 처리
   *
   */
  subscribeToTyping(params: {
    roomId: string;
    onTypingStart: (
      personas: { chat_room_ai_id: string; persona_name: string }[],
    ) => void;
    onTypingEnd: (chat_room_ai_id: string) => void;
  }) {
    const channelName = `room_typing_${params.roomId}`;

    // 기존 채널 제거
    supabase.getChannels().forEach((ch) => {
      if (ch.topic === channelName) {
        supabase.removeChannel(ch);
      }
    });

    const channel = supabase
      .channel(channelName)
      .on("broadcast", { event: "typing" }, (payload) => {
        if (payload.payload.type === "typing_start") {
          params.onTypingStart(payload.payload.personas);
        } else if (payload.payload.type === "typing_end") {
          params.onTypingEnd(payload.payload.chat_room_ai_id);
        }
      })
      .subscribe((err) => {
        if (err) console.error("[typing broadcast] error:", err);
      });

    return channel;
  },
  /**
   * [타이핑 상태 초기화]
   * - 채팅방 입장 시 실행
   * - 이전에 남아있던 typing_status 제거
   * - AI 응답 실패/중단 시 남은 데이터 정리용
   */
  clearTypingStatus({ roomId }: { roomId: string }) {
    return supabase.from("typing_status").delete().eq("chat_room_id", roomId);
  },
};
