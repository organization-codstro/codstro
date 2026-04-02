import { Edit2 } from "lucide-react";
import { ProfileFooterProps } from "../../../types/pages/Profile/ProfilePage/ProfileFooter";

export default function ProfileFooter({ onEditProfile }: ProfileFooterProps) {
  return (
    <button
      onClick={onEditProfile}
      className="flex items-center justify-center gap-2 px-6 py-2 mt-4 ml-auto font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      <Edit2 className="w-5 h-5" />
      Edit Profile
    </button>
  );
}
