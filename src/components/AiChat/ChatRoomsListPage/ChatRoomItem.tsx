import { ChatRoomItemProps } from "../../../types/AiChat/ChatRoomsListPage/ChatRoomItem";

export function ChatRoomItem({ room, onClick }: ChatRoomItemProps) {
  return (
    <div
      onClick={() => onClick(room.chat_room_id)}
      className="flex items-center gap-3 p-4 transition-colors bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50"
    >
      {/* 아바타 */}
      <div
        className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full shrink-0"
        style={{ backgroundColor: "#587CF0" }}
      >
        {room.chat_room_name.charAt(0)}
      </div>

      {/* 정보 영역 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {room.chat_room_name}
          </h3>
          {room.chat_rooms_unconfirmed > 0 && (
            <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
              {room.chat_rooms_unconfirmed}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 truncate">
          {room.chat_room_topics}
        </p>

        {/* 뱃지 섹션 */}
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
          >
            {room.chat_room_type}
          </span>
          {room.chat_room_daily_is_main && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
              Main
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
