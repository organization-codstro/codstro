import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { mockAIPersonas } from "../../data/AiChat/mockData";

export default function AIPersonasCollection() {
  const navigate = useNavigate();
  const personas = mockAIPersonas;

  const handleSelectPersona = (personaId: number) => {
    navigate(`/ai-chat/persona/${personaId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/ai-chat")}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Friend Collection
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Discover AI friends to chat with
        </p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <div
              key={persona.ai_persona_id}
              onClick={() => handleSelectPersona(persona.ai_persona_id)}
              className="p-6 transition-all bg-white border border-gray-100 cursor-pointer rounded-xl hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="flex items-center justify-center w-20 h-20 mb-4 text-2xl font-bold text-white rounded-full"
                  style={{ backgroundColor: "#587CF0" }}
                >
                  {persona.ai_persona_name.charAt(0)}
                </div>

                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {persona.ai_persona_name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
                  >
                    {persona.ai_persona_gender}
                  </span>
                  <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                    {persona.ai_persona_personality}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  Topics: {persona.ai_persona_preferred_features}
                </p>
              </div>
            </div>
          ))}
        </div>

        {personas.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Users size={64} className="mb-4" />
            <p>No AI friends available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
