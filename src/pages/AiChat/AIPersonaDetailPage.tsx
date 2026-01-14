import { useNavigate, useParams } from "react-router-dom";
import { mockAIPersonas } from "../../data/AiChat/mockData";

// 분리했던 컴포넌트들을 import 합니다.
// (실제 프로젝트 구조에 맞게 경로를 수정해 주세요)
import { PersonaHero } from "../../components/AiChat/AIPersonaDetailPage/PersonaHero";
import { PersonaInfoCard } from "../../components/AiChat/AIPersonaDetailPage/PersonaInfoCard";
import { NotFoundState } from "../../components/AiChat/AIPersonaDetailPage/NotFoundState";
import { DetailHeader } from "../../components/AiChat/AIPersonaDetailPage/DetailHeader";

export default function AIPersonaDetailPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  // 1. 데이터 찾기 로직
  const persona = mockAIPersonas.find((p) => p.ai_persona_id === personaId);

  // 2. 예외 처리 (데이터가 없을 때)
  if (!persona) {
    return <NotFoundState message="Persona not found" />;
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
          onChatClick={() => navigate(`/ai-chat/${persona.ai_persona_id}`)}
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
