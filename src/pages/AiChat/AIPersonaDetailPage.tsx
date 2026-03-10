/**

* AI 페르소나의 상세 정보를 정의하는 타입입니다.
*/

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AIPersonaDetailService } from "../../api/AiChat/AIPersonaDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";

import { PersonaHero } from "../../components/AiChat/AIPersonaDetailPage/PersonaHero/PersonaHero";
import { PersonaInfoCard } from "../../components/AiChat/AIPersonaDetailPage/PersonaInfoCard";
import { NotFoundState } from "../../components/AiChat/AIPersonaDetailPage/NotFoundState";
import { DetailHeader } from "../../components/AiChat/AIPersonaDetailPage/DetailHeader";
import { AIPersona, AiUserSettings } from "../../types/common/aiChat";

export default function AIPersonaDetailPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [persona, setPersona] = useState<AIPersona | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -- 데이터 로드 (Lifecycle) --
  useEffect(() => {
    const fetchPersonaDetail = async () => {
      // -- 상세 페이지 데이터 예외 처리 --
      if (!personaId) {
        return (
          <NotFoundState message="잘못된 접근입니다. 페르소나 ID가 없습니다." />
        );
      }

      setIsLoading(true);

      try {
        // 1. 유저 ID 확보
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        // 2. 페르소나 상세 정보 조회
        const data = await AIPersonaDetailService.getPersonaDetail({
          personaId,
        });
        setPersona(data as unknown as AIPersona);
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

  // -- 친구 추가 핸들러 --
  const onAddFriendClick = async (settings: AiUserSettings) => {
    if (!userId) {
      toast.warn("로그인이 필요한 서비스입니다.");
      return;
    }
    try {
      await AIPersonaDetailService.addFriend({
        aiPersonaId: personaId!,
        userId,
        aiUserSettings: settings,
      });

      toast.success("친구 추가에 성공하였습니다.");
    } catch (error) {
      console.error(error);
      toast.error("친구 추가에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
          createdDate={persona.created_at}
          profileImageUrl={persona.ai_persona_profile_image_url}
          onAddFriendClick={onAddFriendClick}
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
