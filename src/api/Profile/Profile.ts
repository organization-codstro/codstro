import { supabase } from "../../db/supabase/supabase";
import {
  GetUserFullProfileParams,
  GetUserFullProfileResponse,
} from "../../types/api/Profile/ProfilePage";

/**
 * [프로필 메인 서비스]
 * 관련 테이블: users
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

      console.log(user);

      return {
        userData: {
          name: user.user_name,
          email: user.user_email,
          profilePath: user.user_profile_path,
        },
      };
    } catch (error) {
      console.error("[ProfileService.getUserFullProfile Error]:", error);
      throw error;
    }
  },
};
