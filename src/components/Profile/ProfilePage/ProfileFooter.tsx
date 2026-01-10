import { Award, Edit2 } from "lucide-react";
import { ProfileFooterProps } from "../../../types/pages/Profile/ProfilePage/ProfileFooter";

export default function ProfileFooter({
  onManageBadges,
  onNotices,
  onEditProfile,
}: ProfileFooterProps) {
  return (
    <div className="flex gap-3 pt-6 border-t border-gray-200">
      <button
        onClick={onManageBadges}
        className="flex items-center justify-center gap-2 px-6 py-2 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Award className="w-5 h-5" />
        Manage Badges
      </button>

      <button
        onClick={onNotices}
        className="flex items-center justify-center gap-2 px-6 py-2 font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
      >
        Notices
      </button>

      <button
        onClick={onEditProfile}
        className="flex items-center justify-center gap-2 px-6 py-2 ml-auto font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Edit2 className="w-5 h-5" />
        Edit Profile
      </button>
    </div>
  );
}
