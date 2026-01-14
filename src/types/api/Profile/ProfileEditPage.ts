/**
 * [사용자 정보 조회 파라미터]
 */
export interface GetUserProfileParams {
  userId: string;
}

/**
 * [사용자 정보 조회 응답]
 */
export interface GetUserProfileResponse {
  user_id: string;
  user_name: string;
  user_email: string;
  user_profile_url: string;
  user_join_date: string;
}

/**
 * [프로필 통합 업데이트 파라미터]
 */
export interface UpdateProfileParams {
  userId: string;
  name: string;
  imageFile?: File;
}

/**
 * [프로필 통합 업데이트 응답]
 */
export interface UpdateProfileResponse {
  success: boolean;
  profileUrl?: string;
}

/**
 * [프로필 이미지 전용 업데이트 파라미터]
 */
export interface UpdateAvatarParams {
  userId: string;
  file: File;
  oldUrl?: string;
}
