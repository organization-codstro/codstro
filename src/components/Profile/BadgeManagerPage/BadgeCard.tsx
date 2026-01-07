import { CheckCircle } from "lucide-react";
import { BadgeCardProps } from "../../../types/Profile/BadgeManagerPage/BadgeCard";

export default function BadgeCard({
  badge,
  onClick,
  isDisplayed,
}: BadgeCardProps) {
  const isEarned = badge.earned;

  return (
    <button
      onClick={onClick}
      className={`p-6 w-full text-left rounded-lg border-2 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        isDisplayed
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div
        className={`mb-2 text-5xl ${!isEarned ? "opacity-50 grayscale" : ""}`}
      >
        {badge.icon}
      </div>
      <h3 className="mb-1 text-sm font-bold text-gray-900">{badge.name}</h3>
      <p
        className={`text-xs line-clamp-2 ${
          isEarned ? "text-gray-600" : "text-gray-500"
        }`}
      >
        {badge.description}
      </p>

      {isDisplayed && (
        <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600">
          <CheckCircle className="w-3 h-3" />
          Displayed
        </div>
      )}
    </button>
  );
}
