
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CollectionCard } from "../../components/AiChat/AIPersonasCollectionPage/CollectionCard";
import { CollectionEmptyState } from "../../components/AiChat/AIPersonasCollectionPage/CollectionEmptyState";
import { CollectionHeader } from "../../components/AiChat/AIPersonasCollectionPage/CollectionHeader";
import { AIPersonasCollectionService } from "../../api/AiChat/AIPersonasCollectionPage";
import { AIPersona } from "../../types/pages/AiChat/AIPersonasCollectionPage/AIPersonasCollectionPage";

export default function AIPersonasCollectionPage() {
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [personas, setPersonas] = useState<AIPersona[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -- 데이터 로드 (Lifecycle) --
  useEffect(() => {
    const fetchPersonas = async () => {
      setIsLoading(true);
      try {
        const data = await AIPersonasCollectionService.getAllPersonas();
        setPersonas(data as unknown as AIPersona[]);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        toast.error("컬렉션을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  const handleSelectPersona = (personaId: string) => {
    navigate(`/ai-chat/persona/${personaId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CollectionHeader onBack={() => navigate("/ai-chat")} />
      ```
      {/* 메인 콘텐츠 섹션 */}
      <div className="flex-1 p-4 overflow-y-auto">
        {isLoading ? (
          /* 로딩 상태 UI */
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">AI 페르소나 목록을 불러오는 중...</p>
          </div>
        ) : error ? (
          /* 에러 발생 시 UI */
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              다시 시도
            </button>
          </div>
        ) : personas.length > 0 ? (
          /* 데이터 렌더링 */
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
