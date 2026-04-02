/**
 * [프로필 폼 데이터 타입]
 */
export interface ProfileFormData {
  name: string;
  email: string;
  profilePath: string;
  imageFile?: File; // 새로 업로드할 이미지 파일
}
