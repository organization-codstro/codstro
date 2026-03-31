import { ChatRoom } from "../../../common/AiChat";

export interface ChatRoomItemProps {
  room: ChatRoom;
  onClick: (id: string) => void;
  onDelete?: (id: string) => void;
}
