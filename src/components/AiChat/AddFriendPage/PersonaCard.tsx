import { UserPlus } from "lucide-react";
import { PersonaCardProps } from "../../../types/pages/AiChat/AddFriendPage/PersonaCard";

export function PersonaCard({
  persona,
  isFriend,
  onToggleFriend,
  onViewProfile,
  variant = "vertical",
}: PersonaCardProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={`p-4 transition-all bg-white border border-gray-200 rounded-xl hover:shadow-md ${
        isHorizontal ? "flex items-center justify-between" : ""
      }`}
    >
      <div className={`flex items-center gap-3 ${isHorizontal ? "" : "mb-3"}`}>
        <div
          className="flex items-center justify-center text-xl font-bold text-white rounded-full w-14 h-14 shrink-0"
          style={{ backgroundColor: "#587CF0" }}
        >
          {persona.ai_persona_name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">
            {persona.ai_persona_name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {persona.ai_persona_personality}
          </p>
        </div>
      </div>

      <div className={`flex gap-2 ${isHorizontal ? "items-center" : ""}`}>
        <button
          onClick={() => onViewProfile(persona.ai_persona_id)}
          className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          {isHorizontal ? "Profile" : "View Profile"}
        </button>
        {!isFriend ? (
          <button
            onClick={() => onToggleFriend?.(persona.ai_persona_id)}
            className="px-4 py-2 text-sm font-medium text-white transition-opacity rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#587CF0" }}
          >
            <UserPlus size={18} />
          </button>
        ) : (
          isHorizontal && (
            <span className="px-2 text-xs font-bold text-blue-600">Added</span>
          )
        )}
      </div>
    </div>
  );
}
