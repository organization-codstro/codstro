import { supabase } from "../../db/supabase/supabase";
import { FirebaseStorageService } from "../Image/FirebaseStorageService";
import {
  GetUserProfileParams,
  GetUserProfileResponse,
  UpdateProfileParams,
  UpdateProfileResponse,
  UpdateAvatarParams,
} from "../../types/api/Profile/ProfileEditPage";

/**
 * [프로필 편집 서비스]
 * 사용자의 개인 정보 수정 및 프로필 이미지 업로드를 담당합니다.
 * 관련 테이블: users
 */
export const ProfileEditService = {
  /**
   * [사용자 정보 조회]
   * 편집 페이지 진입 시 현재 사용자의 최신 정보를 DB에서 가져옵니다.
   * @param userId 조회할 유저의 ID
   */
  async getUserProfile(
    params: GetUserProfileParams
  ): Promise<GetUserProfileResponse> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          user_id,
          user_name,
          user_email,
          user_profile_url,
          user_join_date
        `
        )
        .eq("user_id", params.userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[ProfileEditService.getUserProfile Error]:", error);
      throw error;
    }
  },

  /**
   * [프로필 통합 업데이트]
   * 이미지 파일이 있을 경우 Firebase에 먼저 업로드 후, 모든 정보를 Supabase에 저장합니다.
   * @param userId 유저 ID
   * @param name 변경할 이름
   * @param imageFile (선택) 변경할 프로필 이미지 파일
   */
  async updateProfile(
    params: UpdateProfileParams
  ): Promise<UpdateProfileResponse> {
    try {
      let profileUrl: string | undefined;

      // 1. 이미지 파일이 있는 경우 Firebase Storage에 먼저 업로드
      if (params.imageFile) {
        const uploadResult = await FirebaseStorageService.uploadImage(
          params.imageFile,
          "profiles"
        );
        profileUrl = uploadResult.url;
      }

      // 2. Supabase DB 업데이트
      const updatePayload: any = {
        user_name: params.name,
      };

      if (profileUrl) {
        updatePayload.user_profile_url = profileUrl;
      }

      const { error } = await supabase
        .from("users")
        .update(updatePayload)
        .eq("user_id", params.userId);

      if (error) throw error;

      return { success: true, profileUrl };
    } catch (error) {
      console.error("[ProfileEditService.updateProfile Error]:", error);
      throw error;
    }
  },

  /**
   * [프로필 이미지 전용 업로드 및 삭제]
   * 기존 이미지를 삭제하고 새로운 이미지를 적용할 때 사용합니다.
   */
  async updateAvatar(params: UpdateAvatarParams): Promise<string> {
    try {
      // 1. 기존 이미지가 있다면 삭제 (최적화)
      if (params.oldUrl) {
        await FirebaseStorageService.deleteImage(params.oldUrl);
      }

      // 2. 새 이미지 업로드
      const { url } = await FirebaseStorageService.uploadImage(
        params.file,
        "profiles"
      );

      // 3. DB 업데이트
      const { error } = await supabase
        .from("users")
        .update({ user_profile_url: url })
        .eq("user_id", params.userId);

      if (error) throw error;
      return url;
    } catch (error) {
      console.error("[ProfileEditService.updateAvatar Error]:", error);
      throw error;
    }
  },
};
