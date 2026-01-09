import { useNavigate } from "react-router-dom";
import { mockAIPersonas } from "../../data/AiChat/mockData";
import { CollectionCard } from "../../components/AiChat/AIPersonasCollectionPage/CollectionCard";
import { CollectionEmptyState } from "../../components/AiChat/AIPersonasCollectionPage/CollectionEmptyState";
import { CollectionHeader } from "../../components/AiChat/AIPersonasCollectionPage/CollectionHeader";

export default function AIPersonasCollection() {
  const navigate = useNavigate();
  const personas = mockAIPersonas;

  const handleSelectPersona = (personaId: number) => {
    navigate(`/ai-chat/persona/${personaId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CollectionHeader onBack={() => navigate("/ai-chat")} />

      {/* 2. 메인 콘텐츠 섹션 */}
      <div className="flex-1 p-4 overflow-y-auto">
        {personas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {personas.map((persona) => (
              <CollectionCard
                key={persona.ai_persona_id}
                name={persona.ai_persona_name}
                gender={persona.ai_persona_gender}
                personality={persona.ai_persona_personality}
                preferredFeatures={persona.ai_persona_preferred_features}
                onClick={() => handleSelectPersona(persona.ai_persona_id)}
              />
            ))}
          </div>
        ) : (
          /* 데이터가 없을 때 */
          <CollectionEmptyState />
        )}
      </div>
    </div>
  );
}
