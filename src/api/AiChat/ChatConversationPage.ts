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
import { Emoticon } from "../../types/common/aiChat";

/**
 * 실시간 채팅 및 메시지 관리를 위한 서비스
 */
export const ChatConversationService = {
  /**
   * [채팅방 정보 단일 조회]
   * 상단 헤더에 표시할 채팅방의 이름과 주제 정보를 가져옵니다.
   * 참조 테이블: chat_rooms
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
   * [이모지 조회]
   * 사용 가능한 이모티콘을 조회합니다.
   * 참조 테이블: emoticons
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

    if (params.keyword && params.keyword.trim() !== "") {
      query = query.ilike("emoticon_name", `%${params.keyword}%`);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return {
      data: data ?? [],
      count: count ?? 0,
    };
  },

  /**
   * [메시지 이력 조회]
   * 해당 채팅방의 과거 메시지들을 인덱스 순으로 가져옵니다.
   * 참조 테이블: chat_messages
   */
  async getMessages(params: GetMessagesParams) {
    const { roomId } = params;

    const { data: messages, error: messageError } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("chat_room_id", roomId)
      .order("chat_message_index", { ascending: true });

    if (messageError)
      throw new Error(`[getMessages Error]: ${messageError.message}`);

    const { error: rpcError } = await supabase.rpc("update_last_read", {
      room_id: roomId,
    });

    if (rpcError)
      throw new Error(
        `[updateLastReadMessageIndex Error]: ${rpcError.message}`,
      );

    return messages;
  },

  /**
   * [채팅방 인원 확인]
   * 해당 채팅방에 참여중인 페르소나의 이름, id를 가져옵니다
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
   * 유저가 입력한 메시지를 DB에 저장합니다.
   * 참조 테이블: chat_messages
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
   * [AI 응답 생성 요청]
   * 유저 메시지 저장 후 ai-chat Edge Function을 호출하여 AI 응답을 생성합니다.
   * AI 응답은 Edge Function 내부에서 chat_messages 테이블에 저장되며
   * 실시간 구독을 통해 화면에 반영됩니다.
   */
  async requestAiResponse(params: {
    chat_room_id: string;
    userMessage: SendMessageParams;
  }) {
    const { error } = await supabase.functions.invoke("ai-chat", {
      body: {
        chat_room_id: params.chat_room_id,
        userMessage: params.userMessage,
      },
    });

    if (error) throw new Error(`[requestAiResponse Error]: ${error.message}`);
  },

  /**
   * [실시간 메시지 구독]
   * 새로운 메시지가 DB에 추가될 때마다 클라이언트에서 감지하도록 설정합니다.
   * AI의 답변이나 상대방의 메시지를 즉각적으로 화면에 반영합니다.
   */
  subscribeToMessages(params: SubscribeToMessagesParams) {
    const channel = supabase
      .channel(`room_${params.roomId}_${Date.now()}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          if (payload.new?.chat_room_id !== params.roomId) return;
          params.callback(payload);
        },
      )
      .subscribe((status, err) => {
        console.log("[subscription] status:", status);
        if (err) console.error("[subscription] error:", err);
      });

    return channel;
  },
};
