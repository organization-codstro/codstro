import { ChatRoom } from "../../../common/aiChat";

export interface RoomInfoFormProps {
  data: ChatRoom;
  onChange: (data: ChatRoom) => void;
}
