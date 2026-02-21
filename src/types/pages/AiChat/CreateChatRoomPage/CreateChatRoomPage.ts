/**
* 채팅방 생성 성공 후 반환되는 방 정보 타입
*/
export interface CreatedRoomResponse {
  chat_room_id: string;
  chat_room_name: string;
  [key: string]: any;
}
