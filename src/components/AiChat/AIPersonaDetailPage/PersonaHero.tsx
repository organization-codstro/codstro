import { Calendar, MessageCircle } from "lucide-react";
import { PersonaHeroProps } from "../../../types/AiChat/AIPersonaDetailPage/PersonaHero";

export function PersonaHero({
  name,
  gender,
  age,
  createdDate,
  onChatClick,
}: PersonaHeroProps) {
  return (
    <div className="p-8 bg-white border-b border-gray-100">
      <div className="flex flex-col items-center text-center">
        {/* 아바타 */}
        <div
          className="flex items-center justify-center w-32 h-32 mb-6 text-4xl font-bold text-white rounded-full"
          style={{ backgroundColor: "#587CF0" }}
        >
          {name.charAt(0)}
        </div>

        {/* 이름 */}
        <h2 className="mb-2 text-3xl font-bold text-gray-900">{name}</h2>

        {/* 뱃지 섹션 */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
          >
            {gender}
          </span>
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
            {age} years old
          </span>
        </div>

        {/* 가입 날짜 */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Calendar size={16} />
          <span>Joined {new Date(createdDate).toLocaleDateString()}</span>
        </div>

        {/* 채팅 시작 버튼 */}
        <button
          onClick={onChatClick}
          className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-opacity rounded-full hover:opacity-90"
          style={{ backgroundColor: "#587CF0" }}
        >
          <MessageCircle size={20} />
          Start Chat
        </button>
      </div>
    </div>
  );
}
