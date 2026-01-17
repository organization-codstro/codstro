export interface ChatRoom {
  chat_room_id: string;
  user_id: string;
  chat_room_name: string;
  chat_room_type: string;
  chat_room_topics: string;
  chat_rooms_unconfirmed: number;
  chat_room_created_date: string;
  chat_room_daily_is_main: boolean;
  daily_new_chats?: {
    daily_new_chats: string;
  };
}
