export interface LevelProgressProps {
  points: number;
  progressPercentage: number;
  pointsToNextLevel: number;
  currentLevelName: string;
  nextLevelName?: string;
}
