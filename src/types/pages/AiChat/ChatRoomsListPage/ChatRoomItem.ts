import { ChatRoom } from "./ChatRoomsListPage";

export interface ChatRoomItemProps {
  room: ChatRoom;
  onClick: (id: string) => void;
}
