import { Zap, Award, Calendar, Mail, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getUserLevelByPoints,
  getNextLevelByPoints,
} from "../../data/Profile/userLevel";

export default function Profile() {
  const navigate = useNavigate();

  const userData = {
    name: "John Developer",
    email: "john@example.com",
    joinDate: "2024-01-01",
    points: 15500,
    selectedBadge: "Advanced Learner",
  };

  const currentLevel = getUserLevelByPoints(userData.points);
  const nextLevel = getNextLevelByPoints(userData.points);

  const pointsToNextLevel = nextLevel
    ? nextLevel.requiredPoints - userData.points
    : 0;

  const pointsForCurrentLevel = nextLevel
    ? nextLevel.requiredPoints - currentLevel.requiredPoints
    : 0;

  const pointsInCurrentLevel = userData.points - currentLevel.requiredPoints;

  const progressPercentage =
    pointsForCurrentLevel > 0
      ? (pointsInCurrentLevel / pointsForCurrentLevel) * 100
      : 100;

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <div className="p-8 bg-white border border-gray-200 rounded-lg">
        <div className="flex flex-col gap-8 mb-8">
          {/* Left Profile Summary */}
          <div className="flex items-center justify-between gap-8">
            {/* Group 1: Avatar + Name (왼쪽) */}
            <div className="flex items-center gap-4">
              {/* Profile Avatar */}
              <div
                className="flex items-center justify-center w-32 h-32 text-5xl font-bold text-white rounded-full shrink-0"
                style={{ backgroundColor: "#587CF0" }}
              >
                {userData.name.charAt(0)}
              </div>
              {/* Name */}
              <h1 className="text-2xl font-bold text-gray-900">
                {userData.name}
              </h1>
            </div>

            {/* Group 2: Level + Badge (오른쪽) */}
            <div className="flex items-stretch gap-3">
              {/* Level Box */}
              <div className="flex flex-col justify-center w-64 px-6 py-3 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-lg font-bold text-blue-600">
                  {currentLevel.name}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {currentLevel.description}
                </p>
              </div>

              {/* Active Badge (1.5배) */}
              <div className="flex items-center justify-center w-24 h-24 border border-gray-300 border-dashed rounded-lg bg-gray-50">
                <Award className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="w-[100%] mx-auto space-y-6 ml-4 ">
            {" "}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Name
                </label>
                <p className="text-lg text-gray-900">{userData.name}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <p className="text-lg text-gray-900">{userData.email}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Join Date
                </label>
                <p className="text-lg text-gray-900">{userData.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Points & Level Progress */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Zap className="w-4 h-4" />
                Points & Level Progress
              </label>
              <span className="text-2xl font-bold" style={{ color: "#587CF0" }}>
                {userData.points}
              </span>
            </div>

            <p className="mb-2 text-xs text-gray-600">pts</p>

            <div className="mb-4">
              <div className="w-full h-3 mb-2 bg-gray-200 rounded-full">
                <div
                  className="h-3 transition-all duration-300 rounded-full"
                  style={{
                    backgroundColor: "#587CF0",
                    width: `${Math.min(progressPercentage, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {nextLevel
                  ? `${pointsToNextLevel} points to ${nextLevel.name}`
                  : "Maximum level reached"}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <p className="mb-3 text-xs font-medium text-gray-600">
                Level Progression
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Current</span>
                  <span className="text-xs font-semibold text-blue-600">
                    {currentLevel.name}
                  </span>
                </div>
                {nextLevel && (
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Next Level</span>
                    <span className="text-xs font-semibold text-gray-400">
                      {nextLevel.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={() => navigate("/profile/badges")}
          className="flex items-center justify-center gap-2 px-6 py-2 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Award className="w-5 h-5" />
          Manage Badges
        </button>

        <button
          onClick={() => navigate("/notices")}
          className="flex items-center justify-center gap-2 px-6 py-2 font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
        >
          Notices
        </button>

        <button
          onClick={() => navigate("/profile/edit")}
          className="flex items-center justify-center gap-2 px-6 py-2 ml-auto font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Edit2 className="w-5 h-5" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
