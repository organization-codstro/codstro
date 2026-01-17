/**

* 방 생성 과정에서 초대 가능한 내 AI 친구의 정보를 정의하는 타입
*/
export interface MyAiFriend {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_gender: string;
  ai_persona_personality: string;
  user_ai_setting_id: string;
}

/**

* 채팅방 생성 성공 후 반환되는 방 정보 타입
*/
export interface CreatedRoomResponse {
  chat_room_id: string;
  chat_room_name: string;
  [key: string]: any;
}
