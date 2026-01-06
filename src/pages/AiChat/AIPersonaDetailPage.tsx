import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";
import { mockAIPersonas } from "../../data/AiChat/mockData";

export default function AIPersonaDetail() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  const persona = mockAIPersonas.find(
    (p) => p.ai_persona_id === Number(personaId)
  );

  if (!persona) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500">Persona not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/ai-chat/friends")}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Profile</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 bg-white border-b border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center w-32 h-32 mb-6 text-4xl font-bold text-white rounded-full"
              style={{ backgroundColor: "#587CF0" }}
            >
              {persona.ai_persona_name.charAt(0)}
            </div>

            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              {persona.ai_persona_name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
              >
                {persona.ai_persona_gender}
              </span>
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {persona.ai_persona_age} years old
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
              <Calendar size={16} />
              <span>
                Joined{" "}
                {new Date(persona.ai_persona_created_date).toLocaleDateString()}
              </span>
            </div>

            <button
              onClick={() => navigate(`/ai-chat/:roomId`)}
              className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-opacity rounded-full hover:opacity-90"
              style={{ backgroundColor: "#587CF0" }}
            >
              <MessageCircle size={20} />
              Start Chat
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-6 bg-white border border-gray-100 rounded-xl">
            <h3 className="flex items-center gap-2 mb-3 font-bold text-gray-900">
              <span
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: "#587CF0" }}
              ></span>
              Personality
            </h3>
            <p className="leading-relaxed text-gray-700">
              {persona.ai_persona_personality}
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-xl">
            <h3 className="flex items-center gap-2 mb-3 font-bold text-gray-900">
              <span
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: "#587CF0" }}
              ></span>
              Conversation Topics
            </h3>
            <p className="leading-relaxed text-gray-700">
              {persona.ai_persona_preferred_features}
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-xl">
            <h3 className="flex items-center gap-2 mb-3 font-bold text-gray-900">
              <span
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: "#587CF0" }}
              ></span>
              Speech Style
            </h3>
            <p className="leading-relaxed text-gray-700">
              {persona.ai_persona_speech_style}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
