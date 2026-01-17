/**

* 채팅방의 기본 정보를 정의하는 타입입니다.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChatListHeader } from "../../components/AiChat/ChatRoomsListPage/ChatListHeader";
import { ChatListNav } from "../../components/AiChat/ChatRoomsListPage/ChatListNav";
import { ChatRoomItem } from "../../components/AiChat/ChatRoomsListPage/ChatRoomItem";
import { LoginService } from "../../api/Auth/LoginPage";
import { ChatRoomsListService } from "../../api/AiChat/ChatRoomsListPage";
import { ChatRoom } from "../../types/pages/AiChat/ChatRoomsListPage/ChatRoomsListPage";

export default function ChatRoomsListPage() {
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  // -- 데이터 초기 로드 (Lifecycle) --
  useEffect(() => {
    const fetchChatRooms = async () => {
      setIsLoading(true);
      try {
        // 1. 현재 로그인된 유저 ID 가져오기
        const currentUserId = await LoginService.getCurrentUserId();

        if (!currentUserId) {
          toast.error("로그인이 필요한 서비스입니다.");
          navigate("/login");
          return;
        }

        setUserId(currentUserId);

        // 2. 해당 유저의 채팅방 목록 조회
        const data = await ChatRoomsListService.getChatRooms({
          userId: currentUserId,
        });
        setChatRooms(data as unknown as ChatRoom[]);
      } catch (error: any) {
        console.error(error);
        toast.error("채팅방 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatRooms();
  }, [navigate]);

  // -- 검색 로직 --
  const handleSearch = async (searchTerm: string) => {
    if (!userId) return;

    // 검색어가 비어있으면 전체 목록 다시 로드
    if (!searchTerm.trim()) {
      const data = await ChatRoomsListService.getChatRooms({ userId });
      setChatRooms(data as unknown as ChatRoom[]);
      return;
    }

    try {
      const results = await ChatRoomsListService.searchChatRooms({
        userId,
        searchTerm,
      });
      setChatRooms(results as unknown as ChatRoom[]);
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    }
  };

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
        onSearchChange={handleSearch}
      />

      {/* 2. 네비게이션: 빠른 이동 버튼들 */}
      <ChatListNav buttons={navButtons} />
      {/* 3. 메인 콘텐츠: 채팅방 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          /* 로딩 중 상태 */
          <div className="py-20 text-center text-gray-400">
            <p>Loading conversations...</p>
          </div>
        ) : chatRooms.length > 0 ? (
          /* 리스트 렌더링 */
          chatRooms.map((room) => (
            <ChatRoomItem
              key={room.chat_room_id}
              room={room}
              onClick={(id) => navigate(`/ai-chat/${id}`)}
            />
          ))
        ) : (
          /* 데이터가 없을 때 처리 */
          <div className="py-20 text-center text-gray-400">
            <p>No conversations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
