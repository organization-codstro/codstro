import { CollectionCardProps } from "../../types/pages/AiChat/AIPersonasCollectionPage/CollectionCard";
import clsx from "clsx";

export function CollectionCard({
  name,
  gender,
  oneLineIntroduction,
  preferredFeatures,
  profileImageUrl,
  onClick,
  isSelected = false,
}: CollectionCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "p-6 transition-all border cursor-pointer rounded-xl hover:shadow-lg",
        {
          "bg-blue-50 border-blue-400": isSelected, // 선택 시 스타일
          "bg-white border-gray-100": !isSelected, // 기본 스타일
        },
      )}
    >
      <div className="flex flex-col items-center text-center">
        {/* 아바타 */}
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={name}
            className="object-cover w-20 h-20 mb-4 rounded-full"
          />
        ) : (
          <div
            className="flex items-center justify-center w-20 h-20 mb-4 text-2xl font-bold text-white rounded-full"
            style={{ backgroundColor: "#587CF0" }}
          >
            {name.charAt(0)}
          </div>
        )}

        {/* 이름 */}
        <h3 className="mb-2 text-lg font-bold text-gray-900">{name}</h3>

        {/* 뱃지 섹션 */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 text-sm rounded-full"
            style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
          >
            {{ MALE: "남", FEMALE: "여" }[gender] ?? "성별"}
          </span>
          <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
            {oneLineIntroduction || "설정된 메세지가 없습니다."}
          </span>
        </div>

        {/* 주요 토픽 (2줄 제한) */}
        <p className="text-sm text-gray-600 line-clamp-2">
          Topics: {preferredFeatures}
        </p>
      </div>
    </div>
  );
}
