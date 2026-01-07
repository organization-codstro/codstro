import { Zap } from "lucide-react";

interface LevelProgressProps {
  points: number;
  progressPercentage: number;
  pointsToNextLevel: number;
  currentLevelName: string;
  nextLevelName?: string;
}

export default function LevelProgress({
  points,
  progressPercentage,
  pointsToNextLevel,
  currentLevelName,
  nextLevelName,
}: LevelProgressProps) {
  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Zap className="w-4 h-4" />
          Points & Level Progress
        </label>
        <span className="text-2xl font-bold" style={{ color: "#587CF0" }}>
          {points}
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
          {nextLevelName
            ? `${pointsToNextLevel} points to ${nextLevelName}`
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
              {currentLevelName}
            </span>
          </div>
          {nextLevelName && (
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Next Level</span>
              <span className="text-xs font-semibold text-gray-400">
                {nextLevelName}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
