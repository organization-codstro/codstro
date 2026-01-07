interface ProfileAvatarProps {
  name: string;
  size?: string;
  backgroundColor?: string;
}

export default function ProfileAvatar({
  name,
  size = "w-24 h-24",
  backgroundColor = "#587CF0",
}: ProfileAvatarProps) {
  return (
    <div className="flex justify-center">
      <div
        className={`flex items-center justify-center ${size} text-4xl font-bold text-white rounded-full`}
        style={{ backgroundColor }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
