export interface BadgeResponse {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  requirement: string;
}

/**
 * [전체 배지 목록 및 유저 획득 현황 조회 파라미터]
 */
export type GetUserBadgesParams = number;

/**
 * [대표 배지 설정 파라미터]
 */
export interface SetRepresentativeBadgeParams {
  userId: string;
  badgeId: string;
}
