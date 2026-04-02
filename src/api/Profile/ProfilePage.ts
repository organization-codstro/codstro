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

      return {
        userData: {
          name: user.user_name,
          email: user.user_email,
          joinDate: user.user_join_date,
          profileUrl: user.user_profile_url,
        },
      };
    } catch (error) {
      console.error("[ProfileService.getUserFullProfile Error]:", error);
      throw error;
    }
  },
};
