import { useState } from "react";
import { ChatRoomItemProps } from "../../../types/pages/AiChat/ChatRoomsListPage/ChatRoomItem";
import { ChatRoomsListService } from "../../../api/AiChat/ChatRoomsListPage";
import { toast } from "react-toastify";

export const ChatRoomItem = ({
  room,
  onClick,
  onDelete,
}: ChatRoomItemProps) => {
  const [deleteMode, setDeleteMode] = useState(false);

  const chatRoomReadMessageCount: number =
    room.chat_room_latest_message_index -
    room.chat_room_last_read_message_index;

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지

    if (!deleteMode) {
      // 첫 번째 클릭: 삭제 모드 활성화 (빨간색 표시)
      setDeleteMode(true);
      return;
    }

    // 두 번째 클릭: 실제 삭제 API 호출
    try {
      await ChatRoomsListService.deleteChatRoom({
        chatRoomId: room.chat_room_id,
      });
      toast.success("채팅방이 삭제되었습니다.");
      onDelete?.(room.chat_room_id);
    } catch (error) {
      console.error("채팅방 삭제 실패:", error);
      toast.error("채팅방 삭제에 실패했습니다.");
      setDeleteMode(false);
    }
  };

  const handleBlur = () => {
    // 삭제 모드에서 다른 곳 클릭 시 초기화
    setDeleteMode(false);
  };

  return (
    <li className="flex items-center gap-3 p-4 transition-colors bg-white border-b border-gray-100">
      {/* 클릭 영역 — 아바타 + 정보 */}
      <button
        type="button"
        onClick={() => !deleteMode && onClick(room.chat_room_id)}
        onBlur={handleBlur}
        className="flex items-center flex-1 min-w-0 gap-3 text-left focus:outline-none hover:opacity-80"
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
            {chatRoomReadMessageCount > 0 && (
              <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                {chatRoomReadMessageCount}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 truncate">
            {room.chat_room_topics}
          </p>

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
      </button>

      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={handleDeleteClick}
        className={`
        flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all duration-200
        ${
          deleteMode
            ? "bg-red-500 text-white shadow-md scale-110"
            : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-400"
        }
      `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      </button>
    </li>
  );
};
