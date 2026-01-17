import { Award } from "lucide-react";
import { ProfileHeaderProps } from "../../../types/pages/Profile/ProfilePage/ProfileHeader";

export default function ProfileHeader({
  name,
  profileUrl,
  levelName,
  levelDescription,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-8">
      {/* Group 1: Avatar + Name */}
      <div className="flex items-center gap-4">
        {/* 아바타 영역: 이미지가 있으면 img 표시, 없으면 이름 첫 글자 표시 */}
        <div
          className="flex items-center justify-center w-32 h-32 overflow-hidden text-5xl font-bold text-white rounded-full shrink-0"
          style={{ backgroundColor: profileUrl ? "transparent" : "#587CF0" }}
        >
          {profileUrl ? (
            <img
              src={profileUrl}
              alt={name}
              className="object-cover w-full h-full"
            />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
      </div>

      {/* Group 2: Level + Badge */}
      <div className="flex items-stretch gap-3">
        <div className="flex flex-col justify-center w-64 px-6 py-3 border border-blue-200 rounded-lg bg-blue-50">
          <p className="text-lg font-bold text-blue-600">{levelName}</p>
          <p className="mt-1 text-xs text-gray-600">{levelDescription}</p>
        </div>
        <div className="flex items-center justify-center w-24 h-24 border border-gray-300 border-dashed rounded-lg bg-gray-50">
          <Award className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
