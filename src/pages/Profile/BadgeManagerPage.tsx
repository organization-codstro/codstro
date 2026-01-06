import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, badges } from "../../data/Profile/badge";

export default function BadgeManager() {
  const navigate = useNavigate();

  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDisplayBadge, setSelectedDisplayBadge] =
    useState("Advanced Learner");

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  return (
    <div className="max-w-6xl p-8 mx-auto">
      {/* 🔙 Back */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Profile
      </button>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Badge Collection
      </h1>
      <p className="mb-8 text-gray-600">
        You have earned {earnedBadges.length} badges
      </p>

      {/* 🔍 Badge Detail Modal */}
      {showDetails && selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="mb-4 text-6xl">{selectedBadge.icon}</div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              {selectedBadge.name}
            </h2>

            <p className="mb-4 text-gray-600">{selectedBadge.description}</p>

            <div className="p-4 mb-4 rounded-lg bg-gray-50">
              <p className="mb-1 text-sm font-medium text-gray-700">
                Requirement
              </p>
              <p className="text-sm text-gray-600">
                {selectedBadge.requirement}
              </p>
            </div>

            {selectedBadge.earned ? (
              <div className="flex items-center gap-2 mb-4 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  Earned on {selectedBadge.earnedDate}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-4 mb-4 bg-gray-100 rounded-lg">
                <Info className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600">
                  Keep learning to unlock this badge!
                </p>
              </div>
            )}

            {selectedBadge.earned && (
              <button
                onClick={() => {
                  setSelectedDisplayBadge(selectedBadge.name);
                  setShowDetails(false);
                }}
                className="w-full px-4 py-2 mb-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Set as Display Badge
              </button>
            )}

            <button
              onClick={() => setShowDetails(false)}
              className="w-full px-4 py-2 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Earned Badges */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Earned Badges ({earnedBadges.length})
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => {
                setSelectedBadge(badge);
                setShowDetails(true);
              }}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedDisplayBadge === badge.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="mb-2 text-5xl">{badge.icon}</div>
              <h3 className="mb-1 text-sm font-bold text-gray-900">
                {badge.name}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {badge.description}
              </p>

              {selectedDisplayBadge === badge.name && (
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600">
                  <CheckCircle className="w-3 h-3" />
                  Displayed
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🔒 Locked Badges */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Locked Badges ({lockedBadges.length})
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {lockedBadges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => {
                setSelectedBadge(badge);
                setShowDetails(true);
              }}
              className="p-6 w-full text-left bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#587CF0]"
            >
              <div className="mb-2 text-5xl opacity-50 grayscale">
                {badge.icon}
              </div>
              <h3 className="mb-1 text-sm font-bold text-gray-900">
                {badge.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {badge.description}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
