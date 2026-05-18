/**

* AI 페르소나의 상세 정보를 정의하는 타입입니다.
*/

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { LoginService } from "../../api/Auth/LoginPage";
import { AIPersonaDetailService } from "../../api/AiChat/AIPersonaDetailPage";

import { PersonaHero } from "../../components/AiChat/AIPersonaDetailPage/PersonaHero/PersonaHero";
import { PersonaInfoCard } from "../../components/AiChat/AIPersonaDetailPage/PersonaInfoCard";
import { DetailHeader } from "../../components/AiChat/AIPersonaDetailPage/DetailHeader";
import { AIPersona, AiUserSettings } from "../../types/common/AiChat";
import { NotFoundPage } from "../NotFound/NotFoundPage";

export default function AIPersonaDetailPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [persona, setPersona] = useState<AIPersona | null>(null);
  const [isFriend, setIsFriend] = useState(false);
  const [userAiSettingId, setUserAiSettingId] = useState<string | null>(null);

  // -- 데이터 로드 (Lifecycle) --
  useEffect(() => {
    const fetchPersonaDetail = async () => {
      if (!personaId) {
        return <NotFoundPage />;
      }

      setIsLoading(true);

      try {
        // 1. 유저 ID 확보
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        // 2. 페르소나 상세 정보 조회
        const data = await AIPersonaDetailService.getPersonaDetail({
          personaId,
          userId: currentUserId,
        });
        setPersona(data.aiPersona);
        setIsFriend(data.isFriend);
        setUserAiSettingId(data.userAiSettingId ?? null);
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
      const data = await AIPersonaDetailService.addFriend({
        aiPersonaId: personaId!,
        userId,
        aiUserSettings: settings,
      });

      setIsFriend(true);
      setUserAiSettingId(data.user_ai_setting_id);
      toast.success("친구 추가에 성공하였습니다.");
    } catch (error) {
      console.error(error);
      toast.error("친구 추가에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  //친구 삭제 헨들러
  const onDeleteFriendClick = async () => {
    if (!userAiSettingId) return;
    try {
      await AIPersonaDetailService.deleteFriend({ userAiSettingId });
      setIsFriend(false);
      setUserAiSettingId(null);
      toast.success("친구가 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message === "ALREADY_IN_CHAT_ROOM") {
        toast.error(
          "이미 채팅방에 포함되어있는 친구 입니다, 채팅방을 삭제하고 다시 시도하여 주세요.",
        );
      } else {
        toast.error("친구 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
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
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <DetailHeader onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto">
        {/* 히어로 섹션: 아바타 및 기본 정보 */}
        <PersonaHero
          name={persona.ai_persona_name}
          gender={persona.ai_persona_gender}
          age={persona.ai_persona_age}
          createdDate={persona.created_at}
          profilePath={persona.ai_persona_profile_image_path}
          onAddFriendClick={onAddFriendClick}
          onDeleteFriendClick={onDeleteFriendClick}
          isFriend={isFriend}
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
