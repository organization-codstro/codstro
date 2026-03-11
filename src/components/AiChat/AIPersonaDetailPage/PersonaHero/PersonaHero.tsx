import { Calendar, UserPlus } from "lucide-react";
import { PersonaHeroProps } from "../../../../types/pages/AiChat/AIPersonaDetailPage/PersonaHero/PersonaHero";
import { AddFriendModal } from "./Addfriendmodal/Addfriendmodal";
import { useState } from "react";
import { AiUserSettings } from "../../../../types/common/aiChat";

export function PersonaHero({
  name,
  gender,
  age,
  createdDate,
  profileImageUrl,
  onAddFriendClick,
  isFriend,
}: PersonaHeroProps) {
  // -- 모달 열림/닫힘 상태 --
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 모달에서 확인 클릭 시 부모의 onAddFriendClick 실행
  const handleConfirm = (settings: AiUserSettings) => {
    // 설정 값을 부모(AIPersonaDetailPage)로 전달
    onAddFriendClick(settings);
  };

  return (
    <>
      <div className="p-8 bg-white border-b border-gray-100">
        <div className="flex flex-col items-center text-center">
          {/* 아바타 */}
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={name}
              className="object-cover w-32 h-32 mb-6 rounded-full"
            />
          ) : (
            <div
              className="flex items-center justify-center w-32 h-32 mb-6 text-4xl font-bold text-white rounded-full"
              style={{ backgroundColor: "#587CF0" }}
            >
              {name.charAt(0)}
            </div>
          )}

          {/* 이름 */}
          <h2 className="mb-2 text-3xl font-bold text-gray-900">{name}</h2>

          {/* 뱃지 */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
            >
              {{ MALE: "남", FEMALE: "여" }[gender] ?? "성별"}
            </span>

            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
              {age} 살
            </span>
          </div>

          {/* 가입 날짜 + 버튼 */}
          <div className="flex items-center gap-10 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>Joined {new Date(createdDate).toLocaleDateString()}</span>
            </div>

            <button
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-full transition-opacity
  ${
    isFriend
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#587CF0] hover:opacity-90"
  }`}
              disabled={isFriend}
              onClick={handleOpenModal}
            >
              <UserPlus size={18} />
              {isFriend ? "Already Friend" : "Add Friend"}
            </button>
          </div>
        </div>
      </div>
      {/* 친구 추가 확인 모달 */}
      <AddFriendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        personaName={name}
        profileImageUrl={profileImageUrl}
      />
    </>
  );
}
