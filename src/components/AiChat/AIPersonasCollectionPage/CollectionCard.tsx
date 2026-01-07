import { CollectionCardProps } from "../../../types/AiChat/AIPersonasCollectionPage/CollectionCard";

export function CollectionCard({
  name,
  gender,
  personality,
  preferredFeatures,
  onClick,
}: CollectionCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-6 transition-all bg-white border border-gray-100 cursor-pointer rounded-xl hover:shadow-lg"
    >
      <div className="flex flex-col items-center text-center">
        {/* 아바타 */}
        <div
          className="flex items-center justify-center w-20 h-20 mb-4 text-2xl font-bold text-white rounded-full"
          style={{ backgroundColor: "#587CF0" }}
        >
          {name.charAt(0)}
        </div>

        {/* 이름 */}
        <h3 className="mb-2 text-lg font-bold text-gray-900">{name}</h3>

        {/* 뱃지 섹션 */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 text-sm rounded-full"
            style={{ backgroundColor: "#E8EFFE", color: "#587CF0" }}
          >
            {gender}
          </span>
          <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
            {personality}
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
