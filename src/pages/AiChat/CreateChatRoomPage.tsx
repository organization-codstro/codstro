import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateRoomHeader } from "../../components/AiChat/CreateChatRoomPage/CreateRoomHeader";
import { RoomInfoForm } from "../../components/AiChat/CreateChatRoomPage/RoomInfoForm";
import { FriendSelector } from "../../components/AiChat/CreateChatRoomPage/FriendSelector";
import { CreateRoomFooter } from "../../components/AiChat/CreateChatRoomPage/CreateRoomFooter";
import { LoginService } from "../../api/Auth/LoginPage";
import { CreateChatRoomService } from "../../api/AiChat/CreateChatRoomPage";
import { ChatRoom, UserAIFriend } from "../../types/common/aiChat";

export default function CreateChatRoomPage() {
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [myFriends, setMyFriends] = useState<UserAIFriend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1단계: 방 정보 상태
  const [roomData, setRoomData] = useState<ChatRoom>({
    chat_room_id: "",
    user_id: "",
    chat_room_name: "",
    chat_room_type: "daily",
    chat_room_topics: "",
    chat_room_unconfirmed: 0,
    chat_room_created_date: "",
    chat_room_daily_is_main: false,
  });

  // 2단계: 선택된 AI 설정 ID 상태 (user_ai_setting_id 기준)
  const [selectedAiSettingIds, setSelectedAiSettingIds] = useState<string[]>(
    [],
  );

  // -- 데이터 로드 (Lifecycle) --
  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true);
      try {
        const currentUserId = await LoginService.getCurrentUserId();
        if (!currentUserId) {
          toast.error("로그인이 필요한 서비스입니다.");
          navigate("/login");
          return;
        }
        setUserId(currentUserId);

        // 내 친구 목록 로드
        const friends = await CreateChatRoomService.getMyFriends({
          userId: currentUserId,
        });
        setMyFriends(friends as unknown as UserAIFriend[]);
      } catch (error) {
        console.error(error);
        toast.error("친구 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [navigate]);

  // -- 단계 전환 및 생성 로직 --
  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      if (!userId || !roomData) return;

      const toastId = toast.loading("채팅방을 생성하고 있습니다...");

      try {
        const newRoom = await CreateChatRoomService.createChatRoomWithAi({
          chatRoomData: {
            user_id: roomData?.user_id,
            chat_room_name: roomData?.chat_room_name,
            chat_room_type: roomData?.chat_room_type,
            chat_room_topics: roomData?.chat_room_topics,
            chat_room_daily_is_main: roomData?.chat_room_daily_is_main,
          },
          selectedAiSettingIds,
        });

        toast.update(toastId, {
          render: "채팅방이 성공적으로 생성되었습니다!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        // 생성된 방으로 이동
        navigate(`/ai-chat/${newRoom.chat_room_id}`);
      } catch (error: any) {
        console.error(error);
        toast.update(toastId, {
          render: `방 생성 실패: ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const toggleFriend = (settingId: string) => {
    setSelectedAiSettingIds((prev) =>
      prev.includes(settingId)
        ? prev.filter((id) => id !== settingId)
        : [...prev, settingId],
    );
  };

  // -- 유효성 검사 --
  const isStep1Valid = !!(
    roomData.chat_room_name.trim() && roomData.chat_room_topics.trim()
  );
  const isStep2Valid = selectedAiSettingIds.length > 0;
  const isValid = step === 1 ? isStep1Valid : isStep2Valid;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 1. 상단 헤더 (진행 바 포함) */}
      <CreateRoomHeader
        step={step}
        onBack={() => (step === 1 ? navigate("/ai-chat") : setStep(1))}
      />

      {/* 2. 메인 콘텐츠 (단계별 조건부 렌더링) */}
      <div className="flex-1 p-6 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            데이터를 불러오는 중...
          </div>
        ) : step === 1 ? (
          <RoomInfoForm data={roomData} onChange={setRoomData} />
        ) : (
          <FriendSelector
            friends={myFriends}
            selectedIds={selectedAiSettingIds}
            onToggle={toggleFriend}
          />
        )}
      </div>

      {/* 3. 하단 푸터 (액션 버튼) */}
      <CreateRoomFooter step={step} isValid={isValid} onNext={handleNext} />
    </div>
  );
}
