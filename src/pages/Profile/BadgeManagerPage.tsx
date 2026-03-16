import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginService } from "../../api/Auth/LoginPage";
import { BadgeManagerService } from "../../api/Profile/BadgeManagerPage";
import BackButton from "../../components/Profile/BadgeManagerPage/BackButton";
import BadgeSection from "../../components/Profile/BadgeManagerPage/BadgeSection";
import BadgeCard from "../../components/Profile/BadgeManagerPage/BadgeCard";
import BadgeDetailModal from "../../components/Profile/BadgeManagerPage/BadgeDetailModal";

/* -------------------------------------------------------------------------- */
/* API 관련 타입                                 */
/* -------------------------------------------------------------------------- */
import { BadgeResponse } from "../../types/api/Profile/BadgeManagerPage";

export default function BadgeManagerPage() {
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /* 상태 관리                                     */
  /* -------------------------------------------------------------------------- */
  const [userId, setUserId] = useState<string | null>(null);
  const [badges, setBadges] = useState<BadgeResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedBadge, setSelectedBadge] = useState<BadgeResponse | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDisplayBadge, setSelectedDisplayBadge] = useState<string>("");

  /* -------------------------------------------------------------------------- */
  /* 데이터 페칭 (Lifecycle)                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const initPage = async () => {
      try {
        setIsLoading(true);
        // 1. 유저 ID 확보
        const currentUserId = await LoginService.getCurrentUserId();

        if (!currentUserId) {
          toast.error("로그인이 필요한 서비스입니다.");
          navigate("/login");
          return;
        }

        setUserId(currentUserId);

        // 2. 배지 목록 조회
        const badgeData =
          await BadgeManagerService.getUserBadges(currentUserId);
        setBadges(badgeData);

        // 획득한 배지 중 첫 번째 혹은 기설정된 대표 배지 로직이 있다면 여기서 초기화 가능
      } catch (err) {
        console.error(err);
        setError("배지 정보를 불러오는 중 오류가 발생했습니다.");
        toast.error("데이터 로딩 실패");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [navigate]);

  /* -------------------------------------------------------------------------- */
  /* 핸들러 함수                                   */
  /* -------------------------------------------------------------------------- */

  // 배지 클릭 시 상세 모달 오픈
  const handleBadgeClick = (badge: BadgeResponse) => {
    setSelectedBadge(badge);
    setShowDetails(true);
  };

  // 대표 배지 설정 연동
  const handleSetDisplayBadge = async (badgeId: string) => {
    if (!userId) return;

    const loadingToast = toast.loading("대표 배지를 설정 중입니다...");
    try {
      await BadgeManagerService.setRepresentativeBadge({
        userId,
        badgeId: badgeId,
      });

      // UI 상태 업데이트
      const targetBadge = badges.find((b) => b.id === badgeId);
      if (targetBadge) {
        setSelectedDisplayBadge(targetBadge.name);
      }

      toast.update(loadingToast, {
        render: "대표 배지가 변경되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      setShowDetails(false);
    } catch (err) {
      toast.update(loadingToast, {
        render: "설정 변경에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /* 데이터 필터링                                 */
  /* -------------------------------------------------------------------------- */
  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-500">Loading Badges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl p-8 mx-auto">
      {/* 1. 뒤로가기 버튼 */}
      <BackButton
        onClick={() => navigate("/profile")}
        label="Back to Profile"
      />

      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Badge Collection
        </h1>
        <p className="text-gray-600">
          You have earned {earnedBadges.length} badges
        </p>
      </header>

      {/* 2. 획득한 배지 섹션 */}
      {earnedBadges.length > 0 ? (
        <BadgeSection title="Earned Badges" count={earnedBadges.length}>
          {earnedBadges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              onClick={() => handleBadgeClick(badge)}
              isDisplayed={selectedDisplayBadge === badge.name}
            />
          ))}
        </BadgeSection>
      ) : (
        <div className="py-10 text-center border-2 border-dashed rounded-xl mb-14">
          <p className="text-gray-400">아직 획득한 배지가 없습니다.</p>
        </div>
      )}

      {/* 3. 잠긴 배지 섹션 */}
      <BadgeSection title="Locked Badges" count={lockedBadges.length}>
        {lockedBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            onClick={() => handleBadgeClick(badge)}
          />
        ))}
      </BadgeSection>

      {/* 4. 배지 상세 모달 */}
      {showDetails && selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge}
          onClose={() => setShowDetails(false)}
          onSetDisplay={() => handleSetDisplayBadge(selectedBadge.id)}
        />
      )}
    </div>
  );
}
