import { supabase } from "../../db/supabase/supabase";
import {
  GetUserFullProfileParams,
  GetUserFullProfileResponse,
} from "../../types/api/Profile/ProfilePage";

/**
 * [프로필 메인 서비스]
 * 유저의 상세 정보 조회 및 제공된 USER_LEVELS 기준에 따른 레벨 계산을 담당합니다.
 * 관련 테이블: users, user_levels
 */
export const ProfileService = {
  /**
   * [유저 프로필 및 레벨 정보 통합 조회]
   * @param userId 조회할 유저의 ID
   */
  async getUserFullProfile(
    params: GetUserFullProfileParams,
  ): Promise<GetUserFullProfileResponse> {
    try {
      // 1. 유저 기본 정보 조회
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", params.userId)
        .single();

      if (userError) throw userError;

      const { data: levels, error: levelError } = await supabase
        .from("user_levels")
        .select("*")
        .order("user_level_required_points", { ascending: true });

      if (levelError) throw levelError;

      const currentPoints = user.user__points;

      // 3. 현재 레벨 계산 (제공된 데이터 기준)
      // 내 포인트보다 작거나 같은 레벨 중 가장 높은 요구치를 가진 레벨을 찾습니다.
      const currentLevel =
        [...levels]
          .reverse()
          .find(
            (level) => currentPoints >= level.user_levels_required_points,
          ) || levels[0];

      // 4. 다음 레벨 계산
      // 내 포인트보다 높은 요구치를 가진 레벨 중 가장 낮은 요구치를 가진 레벨을 찾습니다.
      const nextLevel =
        levels.find(
          (level) => currentPoints < level.user_levels_required_points,
        ) || null;

      // 5. 컴포넌트용 데이터 매핑
      return {
        userData: {
          name: user.user_name,
          email: user.user_email,
          joinDate: user.user_join_date,
          points: currentPoints,
          profileUrl: user.user_profile_url,
          selectedBadge: user.user_level_id,
        },
        levelInfo: {
          currentLevel: {
            id: currentLevel.user_level_id,
            name: currentLevel.user_levels_name,
            description: currentLevel.user_levels_description,
            requiredPoints: currentLevel.user_levels_required_points,
          },
          nextLevel: nextLevel
            ? {
                name: nextLevel.user_levels_name,
                requiredPoints: nextLevel.user_levels_required_points,
              }
            : null,
        },
      };
    } catch (error) {
      console.error("[ProfileService.getUserFullProfile Error]:", error);
      throw error;
    }
  },
};
