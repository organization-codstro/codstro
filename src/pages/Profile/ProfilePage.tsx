import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import { LoginService } from "../../api/Auth/LoginPage";
import { ProfileService } from "../../api/Profile/ProfilePage";
import ProfileHeader from "../../components/Profile/ProfilePage/ProfileHeader";
import InfoField from "../../components/Profile/ProfilePage/InfoField";
import LevelProgress from "../../components/Profile/ProfilePage/LevelProgress";
import ProfileFooter from "../../components/Profile/ProfilePage/ProfileFooter";

/* -------------------------------------------------------------------------- */
/* API 응답 데이터 타입                                                        */
/* -------------------------------------------------------------------------- */
import { GetUserFullProfileResponse } from "../../types/api/Profile/ProfilePage";

export default function ProfilePage() {
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /* 상태 관리                                                                 */
  /* -------------------------------------------------------------------------- */
  const [profileData, setProfileData] =
    useState<GetUserFullProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------------------------------- */
  /* 데이터 페칭 (useEffect)                                                    */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchFullProfile = async () => {
      try {
        setIsLoading(true);
        // 1. 현재 로그인된 유저 ID 가져오기
        const userId = await LoginService.getCurrentUserId();

        if (!userId) {
          toast.error("로그인 정보가 없습니다. 다시 로그인해주세요.");
          navigate("/login");
          return;
        }

        // 2. 통합 프로필 서비스 호출
        const response = await ProfileService.getUserFullProfile({ userId });
        setProfileData(response);
      } catch (err) {
        console.error(err);
        setError("프로필 데이터를 불러오지 못했습니다.");
        toast.error("데이터 로딩 실패");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullProfile();
  }, [navigate]);

  /* -------------------------------------------------------------------------- */
  /* 데이터 가공 및 계산                                                        */
  /* -------------------------------------------------------------------------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          {error || "사용자 정보를 찾을 수 없습니다."}
        </p>
      </div>
    );
  }

  const { userData, levelInfo } = profileData;
  const { currentLevel, nextLevel } = levelInfo;

  // 프로그레스 바 계산 로직
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
            profileUrl={userData.profileUrl}
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
