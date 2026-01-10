import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  badges } from "../../data/Profile/badge";
import BackButton from "../../components/Profile/BadgeManagerPage/BackButton";
import BadgeSection from "../../components/Profile/BadgeManagerPage/BadgeSection";
import BadgeCard from "../../components/Profile/BadgeManagerPage/BadgeCard";
import BadgeDetailModal from "../../components/Profile/BadgeManagerPage/BadgeDetailModal";
import { Badge } from "../../types/pages/Profile/Profile";

export default function BadgeManager() {
  const navigate = useNavigate();

  // 상태 관리
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDisplayBadge, setSelectedDisplayBadge] =
    useState<string>("Advanced Learner");

  // 데이터 필터링
  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  // 핸들러 함수
  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setShowDetails(true);
  };

  const handleSetDisplayBadge = (badgeName: string) => {
    setSelectedDisplayBadge(badgeName);
  };

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
          onSetDisplay={handleSetDisplayBadge}
        />
      )}
    </div>
  );
}
