import { supabase } from "../../db/supabase/supabase";
import {
  GenerateAiReplyParams,
  GetMessagesParams,
  GetRoomInfoParams,
  MarkAsReadParams,
  SendMessageParams,
  SubscribeToMessagesParams,
} from "../../types/api/AiChat/ChatConversationPage";

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
   * [메시지 이력 조회]
   * 해당 채팅방의 과거 메시지들을 인덱스 순으로 가져옵니다.
   * 참조 테이블: chat_messages
   *
   * todo last_read_message_index를 latest_message_index로 바꾸는 기능 추가
   */
  async getMessages(params: GetMessagesParams) {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("chat_room_id", params.roomId)
      .order("chat_message_index", { ascending: true });

    if (error) throw new Error(`[getMessages Error]: ${error.message}`);
    return data;
  },

  /**
   * [메시지 전송]
   * 유저가 입력한 메시지를 DB에 저장합니다.
   * chat_message_index는 서버 트리거로 처리하거나 클라이언트에서 최대값+1로 계산합니다.
   * 참조 테이블: chat_messages
   */
  async sendMessage(params: SendMessageParams) {
    const { data, error } = await supabase
      .from("chat_messages")
      .insert([
        {
          chat_room_id: params.roomId,
          chat_message_content: params.content,
          chat_message_sender: params.sender,
          chat_message_index: params.nextIndex,
          chat_message_sent_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw new Error(`[sendMessage Error]: ${error.message}`);
    return data[0];
  },

  /**
   * [실시간 메시지 구독]
   * 새로운 메시지가 DB에 추가될 때마다 클라이언트에서 감지하도록 설정합니다.
   * 이를 통해 AI의 답변이나 상대방의 메시지를 즉각적으로 화면에 반영합니다.
   */
  subscribeToMessages(params: SubscribeToMessagesParams) {
    return supabase
      .channel(`room_${params.roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `chat_room_id=eq.${params.roomId}`,
        },
        params.callback,
      )
      .subscribe();
  },

  /**
   * [미확인 메시지 초기화]
   * 채팅방 진입 시 unconfirmed 카운트를 0으로 업데이트합니다.
   * 참조 테이블: chat_rooms
   *
   * 메세지 조회에서 할 예정
   */
  // async markAsRead(params: MarkAsReadParams) {
  //   const { error } = await supabase
  //     .from("chat_rooms")
  //     .update({ chat_room_unconfirmed: 0 })
  //     .eq("chat_room_id", params.roomId);

  //   if (error) console.error("[markAsRead Error]:", error.message);
  // },
};

/**
 * [ChatConversation]
 * Gemini를 사용하여 페르소나 설정에 맞는 답변을 생성합니다.
 */
export const AiResponseService = {
  async generateAiReply(params: GenerateAiReplyParams) {
    // todo : 패르소나 정보 가져오는 로직 추가

    // 1. Gemini에게 페르소나 주입 (System Prompt)
    const prompt = `
      You are "${params.persona.ai_persona_name}". 
      Personality: ${params.persona.ai_persona_personality}
      Speech Style: ${params.persona.ai_persona_speech_style}
      Current emotion: ${params.persona.user_ai_setting_emotion}
      User's message: "${params.userMessage}"
      
      Respond naturally in Korean as this persona.
    `;

    // 2. Edge Function 호출 (Gemini API 로직 포함)
    const { data, error } = await supabase.functions.invoke("gemini-chat", {
      body: { prompt, roomId: params.roomId },
    });

    if (error) throw new Error(`[Gemini Error]: ${error.message}`);
    return data.reply;
  },
};
