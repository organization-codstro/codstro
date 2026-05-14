import { useState, useEffect } from "react";
import { CollectionCardProps } from "../../types/pages/AiChat/AIPersonasCollectionPage/CollectionCard";
import { getFirebaseImageUrl } from "../../db/firebase/firebase";
import { useImageStore } from "../../store/ImageStore";

import clsx from "clsx";

export const CollectionCard = ({
  name,
  gender,
  oneLineIntroduction,
  preferredFeatures,
  profileImagePath,
  onClick,
  isSelected = false,
}: CollectionCardProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const getUrl = useImageStore((state) => state.getUrl);

  useEffect(() => {
    if (!profileImagePath) return;
    getUrl(profileImagePath).then(setAvatarUrl);
  }, [profileImagePath]);

  useEffect(() => {
    if (!profileImagePath) return;

    getFirebaseImageUrl(profileImagePath).then((url) => {
      setAvatarUrl(url);
    });
  }, [profileImagePath]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "p-6 transition-all border cursor-pointer rounded-xl hover:shadow-lg w-full text-left",
        {
          "bg-blue-50 border-blue-400": isSelected,
          "bg-white border-gray-100": !isSelected,
        },
      )}
    >
      <div className="flex flex-col items-center text-center">
        {/* 아바타 */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
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
    </button>
  );
};
