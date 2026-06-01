import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CollectionCard } from "../../components/AiChat/CollectionCard";
import { CollectionEmptyState } from "../../components/AiChat/AIPersonasCollectionPage/CollectionEmptyState";
import { CollectionHeader } from "../../components/AiChat/AIPersonasCollectionPage/CollectionHeader";
import { AIPersonasCollectionService } from "../../api/AiChat/AIPersonasCollectionPage";
import { AIPersona } from "../../types/common/AiChat";
import { LoginService } from "../../api/Auth/LoginPage";

export default function AIPersonasCollectionPage() {
  const navigate = useNavigate();

  // -- 상태 관리 (State) --
  const [personas, setPersonas] = useState<AIPersona[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(
    null,
  );

  // -- 데이터 로드 (Lifecycle) --
  useEffect(() => {
    const fetchPersonas = async () => {
      setIsLoading(true);
      try {
        const userId = await LoginService.getCurrentUserId();
        if (!userId) {
          navigate("/login");
          return;
        }

        const data = await AIPersonasCollectionService.getAllPersonas({
          userId,
        });
        setPersonas(data as AIPersona[]);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "알 수 없는 오류가 발생했습니다.",
        );
        toast.error("컬렉션을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonas();
  }, [navigate]);

  const handleSelectPersona = (personaId: string) => {
    //  선택 상태 변경
    setSelectedPersonaId(personaId);

    navigate(`/ai-chat/persona/${personaId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CollectionHeader
        onBack={() => navigate("/ai-chat")}
        onCreate={() => navigate("/ai-chat/persona/create")}
      />

      {/* 메인 콘텐츠 섹션 */}
      <div className="flex-1 p-4 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">AI 페르소나 목록을 불러오는 중...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4 text-red-500">{error}</p>
            <button
              onClick={() => globalThis.location.reload()}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !error && personas.length === 0 && (
          <CollectionEmptyState />
        )}

        {!isLoading && !error && personas.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {personas.map((persona) => (
              <CollectionCard
                key={persona.ai_persona_id}
                name={persona.ai_persona_name}
                gender={persona.ai_persona_gender}
                profileImagePath={persona.ai_persona_profile_image_path}
                oneLineIntroduction={persona.ai_persona_one_line_introduction}
                preferredFeatures={
                  Array.isArray(persona.ai_persona_preferred_features)
                    ? persona.ai_persona_preferred_features.join(", ")
                    : persona.ai_persona_preferred_features
                }
                isSelected={selectedPersonaId === persona.ai_persona_id}
                onClick={() => handleSelectPersona(persona.ai_persona_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
