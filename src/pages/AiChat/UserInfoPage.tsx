/**

* 유저의 AI 활동 기록 데이터를 정의하는 타입입니다.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserInfoHeader } from "../../components/AiChat/UserInfoPage/UserInfoHeader";
import { UserRecordCard } from "../../components/AiChat/UserInfoPage/UserRecordCard";
import { UserInfoNotice } from "../../components/AiChat/UserInfoPage/UserInfoNotice";
import { UserInfoService } from "../../api/AiChat/UserInfoPage";
import { LoginService } from "../../api/Auth/LoginPage";

export default function UserInfoPage() {
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [userId, setUserId] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  // -- 데이터 초기 로드 (Lifecycle) --
  useEffect(() => {
    const fetchUserRecord = async () => {
      setIsLoading(true);
      try {
        // 1. 유저 ID 조회
        const currentUserId = await LoginService.getCurrentUserId();
        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          navigate("/login");
          return;
        }
        setUserId(currentUserId);

        // 2. 유저 기록 조회
        const record = await UserInfoService.getUserRecord({
          userId: currentUserId,
        });

        if (record) {
          setRecordId(record.ai_user_record_id);
          setContent(record.ai_user_record_summary);
          setLastUpdated(record.created_at);
        }
      } catch (error: any) {
        console.error(error);
        // 데이터가 없는 경우를 위한 예외 처리 (새로 생성하거나 안내 메시지)
        toast.info(
          "기존 기록이 없습니다. 새로운 대화를 통해 기록을 생성해보세요.",
          { toastId: "no-record-warning" }, // 고유 ID 지정 (ui에서 2번 나와서 id를 지정함)
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRecord();
  }, [navigate]);

  // -- 저장 핸들러 (Update) --
  const handleSave = async () => {
    if (!recordId) {
      toast.error("수정할 기록의 ID를 찾을 수 없습니다.");
      return;
    }

    const toastId = toast.loading("수정 내용을 저장 중입니다...");

    try {
      const updatedRecord = await UserInfoService.updateUserRecord({
        recordId,
        summary: content,
      });

      setLastUpdated(updatedRecord.created_at);
      setIsEditing(false);

      toast.update(toastId, {
        render: "내용이 성공적으로 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error: any) {
      console.error(error);
      toast.update(toastId, {
        render: "저장에 실패했습니다. 다시 시도해주세요.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // -- 로딩 중 UX --
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500">유저 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 1. 상단 헤더: 뒤로가기 및 상태에 따른 버튼(Edit/Save) 제어 */}
      <UserInfoHeader
        lastUpdated={lastUpdated}
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
