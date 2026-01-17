/**

* 채팅방의 기본 정보(이름, 주제 등)를 나타내는 타입
*/
export interface ChatRoomInfo {
  chat_room_id: string;
  chat_room_name: string;
  chat_room_topics: string;
}

/**

* 개별 채팅 메시지의 구조를 정의하는 타입
*/
export interface ChatMessage {
  chat_message_id: string;
  chat_rooms_id: string;
  chat_message_content: string;
  chat_message_sender: "USER" | "AI";
  chat_message_index: number;
  chat_message_sent_at: string;
}
