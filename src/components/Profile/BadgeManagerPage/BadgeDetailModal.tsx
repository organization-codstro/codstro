import { CheckCircle, Info, X } from "lucide-react";
import { Badge } from "../../../data/Profile/badge";

interface BadgeDetailModalProps {
  badge: Badge;
  onClose: () => void;
  onSetDisplay: (badgeName: string) => void;
}

export default function BadgeDetailModal({
  badge,
  onClose,
  onSetDisplay,
}: BadgeDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
        {/* 우측 상단 닫기 아이콘 추가 (선택 사항) */}
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-4 text-6xl">{badge.icon}</div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900">{badge.name}</h2>

        <p className="mb-4 text-gray-600">{badge.description}</p>

        <div className="p-4 mb-4 rounded-lg bg-gray-50">
          <p className="mb-1 text-sm font-medium text-gray-700">Requirement</p>
          <p className="text-sm text-gray-600">{badge.requirement}</p>
        </div>

        {badge.earned ? (
          <div className="flex items-center gap-2 mb-4 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Earned on {badge.earnedDate}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4 mb-4 bg-gray-100 rounded-lg">
            <Info className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-600">
              Keep learning to unlock this badge!
            </p>
          </div>
        )}

        {badge.earned && (
          <button
            onClick={() => {
              onSetDisplay(badge.name);
              onClose();
            }}
            className="w-full px-4 py-2 mb-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Set as Display Badge
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full px-4 py-2 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
