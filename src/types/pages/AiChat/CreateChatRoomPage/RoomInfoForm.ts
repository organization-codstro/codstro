import { ChatRoom } from "../../../common/AiChat";

export interface RoomInfoFormProps {
  data: ChatRoom;
  onChange: (data: ChatRoom) => void;
}
