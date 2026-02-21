import { ChatRoom } from "../../../common/aiChat";

export interface ChatRoomItemProps {
  room: ChatRoom;
  onClick: (id: string) => void;
}
