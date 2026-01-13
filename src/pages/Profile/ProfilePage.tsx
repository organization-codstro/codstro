import { Mail, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getUserLevelByPoints,
  getNextLevelByPoints,
} from "../../data/Profile/userLevel";
import ProfileHeader from "../../components/Profile/ProfilePage/ProfileHeader";
import InfoField from "../../components/Profile/ProfilePage/InfoField";
import LevelProgress from "../../components/Profile/ProfilePage/LevelProgress";
import ProfileFooter from "../../components/Profile/ProfilePage/ProfileFooter";

export default function ProfilePage() {
  const navigate = useNavigate();

  // 실제로는 API나 전역 상태에서 가져올 데이터
  const userData = {
    name: "John Developer",
    email: "john@example.com",
    joinDate: "2024-01-01",
    points: 15500,
    selectedBadge: "Advanced Learner",
  };

  // 레벨 및 포인트 계산 로직
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
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col gap-8 mb-8">
          {/* 1. 상단 프로필 요약 (아바타, 레벨박스) */}
          <ProfileHeader
            name={userData.name}
            levelName={currentLevel.name}
            levelDescription={currentLevel.description}
          />

          {/* 2. 상세 정보 그리드 영역 */}
          <div className="grid grid-cols-1 gap-6 ml-4 md:grid-cols-2">
            <InfoField label="Name" value={userData.name} />
            <InfoField label="Email" value={userData.email} icon={Mail} />
            <InfoField
              label="Join Date"
              value={userData.joinDate}
              icon={Calendar}
            />
          </div>

          {/* 3. 포인트 및 레벨 프로그레스 영역 */}
          <LevelProgress
            points={userData.points}
            progressPercentage={progressPercentage}
            pointsToNextLevel={pointsToNextLevel}
            currentLevelName={currentLevel.name}
            nextLevelName={nextLevel?.name}
          />
        </div>
      </div>

      {/* 4. 하단 액션 버튼 영역 */}
      <ProfileFooter
        onManageBadges={() => navigate("/profile/badges")}
        onNotices={() => navigate("/notices")}
        onEditProfile={() => navigate("/profile/edit")}
      />
    </div>
  );
}
