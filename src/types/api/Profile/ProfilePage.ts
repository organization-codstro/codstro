/**
 * [유저 프로필 및 레벨 정보 통합 조회 파라미터]
 */
export interface GetUserFullProfileParams {
  userId: string;
}

/**
 * [유저 프로필 및 레벨 정보 통합 조회 응답]
 */
export interface GetUserFullProfileResponse {
  userData: {
    name: string;
    email: string;
    joinDate: string;
    profileUrl: string;
  };
}
