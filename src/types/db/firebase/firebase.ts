// 저장 가능한 폴더 경로를 제한 (Literal Type)
export type StoragePath =
  | "user_profiles"
  | "chat_images"
  | "emoticons"
  | "plans"
  | "profiles";

export interface UploadResult {
  url: string;
  fileName: string;
  fileType: string;
}
