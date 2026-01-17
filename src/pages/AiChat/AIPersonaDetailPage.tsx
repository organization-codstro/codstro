/**

* AI 페르소나의 상세 정보를 정의하는 타입입니다.
*/

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AIPersonaDetailService } from "../../api/AiChat/AIPersonaDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";

import { PersonaHero } from "../../components/AiChat/AIPersonaDetailPage/PersonaHero";
import { PersonaInfoCard } from "../../components/AiChat/AIPersonaDetailPage/PersonaInfoCard";
import { NotFoundState } from "../../components/AiChat/AIPersonaDetailPage/NotFoundState";
import { DetailHeader } from "../../components/AiChat/AIPersonaDetailPage/DetailHeader";
import { AIPersonaDetail } from "../../types/pages/AiChat/AIPersonaDetailPage/AIPersonaDetailPage";

export default function AIPersonaDetailPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [persona, setPersona] = useState<AIPersonaDetail | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -- 상세 페이지 데이터 예외 처리 --
  if (!personaId) {
    return (
      <NotFoundState message="잘못된 접근입니다. 페르소나 ID가 없습니다." />
    );
  }

  // -- 데이터 로드 (Lifecycle) --
  useEffect(() => {
    const fetchPersonaDetail = async () => {
      setIsLoading(true);
      try {
        // 1. 유저 ID 확보
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        // 2. 페르소나 상세 정보 조회
        const data = await AIPersonaDetailService.getPersonaDetail({
          personaId,
        });
        setPersona(data as unknown as AIPersonaDetail);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        toast.error("정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonaDetail();
  }, [personaId]);

  // -- 채팅 시작 핸들러 --
  const handleChatClick = async () => {
    if (!userId) {
      toast.warn("로그인이 필요한 서비스입니다.");
      return;
    }

    const loadingToast = toast.loading("채팅방을 확인 중입니다...");

    try {
      const roomId = await AIPersonaDetailService.startChatting({
        userId,
        personaId,
      });

      if (roomId) {
        toast.update(loadingToast, {
          render: "채팅방으로 이동합니다.",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        navigate(`/ai-chat/${roomId}`);
      } else {
        // 채팅방이 없을 경우 신규 생성 로직이 필요하거나, 안내 메시지 출력
        toast.update(loadingToast, {
          render: "생성된 채팅방을 찾을 수 없습니다. (일상 대화방 전용)",
          type: "info",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      toast.update(loadingToast, {
        render: err.message || "채팅 시작 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // -- 로딩 중 UX --
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-500">정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  // -- 데이터가 없을 때 UX --
  if (error || !persona) {
    return <NotFoundState message={error || "페르소나를 찾을 수 없습니다."} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <DetailHeader onBack={() => navigate("/ai-chat/friends")} />

      <div className="flex-1 overflow-y-auto">
        {/* 히어로 섹션: 아바타 및 기본 정보 */}
        <PersonaHero
          name={persona.ai_persona_name}
          gender={persona.ai_persona_gender}
          age={persona.ai_persona_age}
          createdDate={persona.ai_persona_created_date}
          onChatClick={handleChatClick}
        />

        {/* 상세 정보 리스트 섹션 */}
        <div className="p-6 space-y-6">
          <PersonaInfoCard
            title="Personality"
            content={persona.ai_persona_personality}
          />

          <PersonaInfoCard
            title="Conversation Topics"
            content={persona.ai_persona_preferred_features}
          />

          <PersonaInfoCard
            title="Speech Style"
            content={persona.ai_persona_speech_style}
          />
        </div>
      </div>
    </div>
  );
}
