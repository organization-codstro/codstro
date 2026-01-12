import { supabase } from "../../db/supabase/supabase";
import {
  BadgeResponse,
  GetUserBadgesParams,
  SetRepresentativeBadgeParams,
} from "../../types/api/Profile/BadgeManagerPage";

/**
 * [배지 서비스]
 * 유저의 배지 획득 현황 조회 및 대표 배지 설정을 담당합니다.
 * 관련 테이블: badges, user_badges, users
 */
export const BadgeManagerService = {
  /**
   * [전체 배지 목록 및 유저 획득 현황 조회]
   * @param userId 조회할 유저의 ID
   * @returns 배지 정보와 획득 여부가 포함된 Badge 배열
   */
  async getUserBadges(userId: GetUserBadgesParams): Promise<BadgeResponse[]> {
    try {
      // 1. 전체 배지 목록 가져오기
      const { data: allBadges, error: badgeError } = await supabase
        .from("badges")
        .select("*");

      if (badgeError) throw badgeError;

      // 2. 유저가 획득한 배지 기록 가져오기
      const { data: userEarnedData, error: userBadgeError } = await supabase
        .from("user_badges")
        .select("badge_id, user_badge_obtained_at")
        .eq("user_id", userId);

      if (userBadgeError) throw userBadgeError;

      // 3. 데이터 매핑 (Mock 데이터 구조와 DB 테이블 구조 결합)
      const earnedBadgeIds = new Set(userEarnedData.map((ub) => ub.badge_id));
      const earnedDateMap = new Map(
        userEarnedData.map((ub) => [ub.badge_id, ub.user_badge_obtained_at])
      );

      return allBadges.map((b) => ({
        id: b.badge_id.toString(),
        name: b.badge_name,
        description: b.badge_description || "",
        icon: b.badge_img_url,
        earned: earnedBadgeIds.has(b.badge_id),
        earnedDate: earnedDateMap.get(b.badge_id) || undefined,
        requirement: b.badge_description,
      }));
    } catch (error) {
      console.error("[BadgeManagerService.getUserBadges Error]:", error);
      throw error;
    }
  },

  /**
   * [대표 배지(Display Badge) 설정]
   * 유저 프로필에 노출될 메인 배지를 업데이트합니다.
   * @param userId 유저 ID
   * @param badgeId 설정할 배지 ID
   */
  async setRepresentativeBadge(
    params: SetRepresentativeBadgeParams
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from("users")
        .update({ user_level_id: params.badgeId })
        .eq("user_id", params.userId);

      if (error) throw error;
    } catch (error) {
      console.error("[BadgeManagerService.setRepresentativeBadge Error]:", error);
      throw error;
    }
  },
};
