import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUserRecord } from "../../data/AiChat/mockData";
import { UserInfoHeader } from "../../components/AiChat/UserInfoPage/UserInfoHeader";
import { UserRecordCard } from "../../components/AiChat/UserInfoPage/UserRecordCard";
import { UserInfoNotice } from "../../components/AiChat/UserInfoPage/UserInfoNotice";

export default function UserInfoPage() {
  const navigate = useNavigate();

  // 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(mockUserRecord.ai_user_record_summary);

  // 저장 핸들러
  const handleSave = () => {
    // API 연산이 필요한 경우 여기에 추가
    console.log("Saving new content:", content);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 1. 상단 헤더: 뒤로가기 및 상태에 따른 버튼(Edit/Save) 제어 */}
      <UserInfoHeader
        lastUpdated={mockUserRecord.ai_user_record_created_date}
        isEditing={isEditing}
        onBack={() => navigate("/ai-chat")}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* 2. 메인 카드: 조회 모드와 편집 모드(textarea) 전환 */}
          <UserRecordCard
            isEditing={isEditing}
            content={content}
            onContentChange={setContent}
          />

          {/* 3. 하단 안내 문구 */}
          <UserInfoNotice />
        </div>
      </div>
    </div>
  );
}
