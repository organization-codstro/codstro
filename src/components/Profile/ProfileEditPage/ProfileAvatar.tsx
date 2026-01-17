import { useRef } from "react";
import { Camera } from "lucide-react";
import { ProfileAvatarProps } from "../../../types/pages/Profile/ProfileEditPage/ProfileAvatar";

export default function ProfileAvatar({
  name,
  src,
  size = "w-24 h-24",
  backgroundColor = "#587CF0",
  onImageChange,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 아바타 클릭 시 숨겨진 input 실행
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시 부모 컴포넌트로 전달
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative group">
        {/* 아바타 본체 */}
        <div
          onClick={handleAvatarClick}
          className={`relative flex items-center justify-center ${size} overflow-hidden text-4xl font-bold text-white rounded-full cursor-pointer hover:opacity-90 transition-opacity`}
          style={{ backgroundColor: src ? "transparent" : backgroundColor }}
        >
          {src ? (
            <img src={src} alt={name} className="object-cover w-full h-full" />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}

          {/* 호버 시 나타나는 카메라 아이콘 오버레이 */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 bg-opacity-30 group-hover:opacity-100">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* 숨겨진 파일 입력 필드 */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* 우측 하단 작은 카메라 버튼 (시각적 힌트) */}
        <button
          type="button"
          onClick={handleAvatarClick}
          className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-gray-600 hover:text-blue-600"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
