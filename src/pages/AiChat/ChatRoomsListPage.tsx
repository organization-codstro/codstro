import { useNavigate } from "react-router-dom";
import { mockChatRooms } from "../../data/AiChat/mockData";
import { ChatListHeader } from "../../components/AiChat/ChatRoomsListPage/ChatListHeader";
import { ChatListNav } from "../../components/AiChat/ChatRoomsListPage/ChatListNav";
import { ChatRoomItem } from "../../components/AiChat/ChatRoomsListPage/ChatRoomItem";

export default function ChatRoomsListPage() {
  const navigate = useNavigate();

  // 데이터 (나중에 API 연결 시 이 부분만 수정하면 됩니다)
  const chatRooms = mockChatRooms;

  // 내비게이션 버튼 설정
  const navButtons = [
    { label: "Friend Collection", onClick: () => navigate("/ai-chat/friends") },
    { label: "Add Friend", onClick: () => navigate("/ai-chat/add-friend") },
    { label: "My Info", onClick: () => navigate("/ai-chat/user-info") },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 1. 헤더: 제목, 검색, 방 만들기 */}
      <ChatListHeader
        onCreateRoom={() => navigate("/ai-chat/create-room")}
        onSearchChange={(val) => console.log("Searching for:", val)}
      />

      {/* 2. 네비게이션: 빠른 이동 버튼들 */}
      <ChatListNav buttons={navButtons} />

      {/* 3. 메인 콘텐츠: 채팅방 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {chatRooms.map((room) => (
          <ChatRoomItem
            key={room.chat_room_id}
            room={room}
            onClick={(id) => navigate(`/ai-chat/${id}`)}
          />
        ))}

        {/* 방이 없을 때 처리 (필요시 추가) */}
        {chatRooms.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p>No conversations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
