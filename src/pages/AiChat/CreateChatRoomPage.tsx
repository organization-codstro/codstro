import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAIPersonas } from "../../data/AiChat/mockData";
import { CreateRoomHeader } from "../../components/AiChat/CreateChatRoomPage/CreateRoomHeader";
import { RoomInfoForm } from "../../components/AiChat/CreateChatRoomPage/RoomInfoForm";
import { FriendSelector } from "../../components/AiChat/CreateChatRoomPage/FriendSelector";
import { CreateRoomFooter } from "../../components/AiChat/CreateChatRoomPage/CreateRoomFooter";

export default function CreateChatRoomPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // 1단계: 방 정보 상태
  const [roomData, setRoomData] = useState({
    name: "",
    type: "daily" as "daily" | "project",
    topics: "",
    isMain: false,
  });

  // 2단계: 선택된 친구 상태
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  // 단계 전환 및 생성 로직
  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // 새로운 채팅방 생성 시뮬레이션
      const newRoomId = Date.now();
      navigate(`/ai-chat/${newRoomId}`);
    }
  };

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  // 유효성 검사
  const isStep1Valid = !!(roomData.name.trim() && roomData.topics.trim());
  const isStep2Valid = selectedFriends.length > 0;
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
        {step === 1 ? (
          <RoomInfoForm data={roomData} onChange={setRoomData} />
        ) : (
          <FriendSelector
            friends={mockAIPersonas}
            selectedIds={selectedFriends}
            onToggle={toggleFriend}
          />
        )}
      </div>

      {/* 3. 하단 푸터 (액션 버튼) */}
      <CreateRoomFooter step={step} isValid={isValid} onNext={handleNext} />
    </div>
  );
}
