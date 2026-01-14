import { ChatRoom } from "../aiChat";

export interface ChatRoomItemProps {
  room: ChatRoom;
  onClick: (id: string) => void;
}
