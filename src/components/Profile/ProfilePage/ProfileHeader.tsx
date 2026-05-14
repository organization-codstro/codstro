import { ProfileHeaderProps } from "../../../types/pages/Profile/ProfilePage/ProfileHeader";

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  profileUrl,
}) => {
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
    </div>
  );
};
