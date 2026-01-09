import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../db/firebase/firebase";
import { StoragePath, UploadResult } from "../../types/db/firebase/firebase";

/**
 * [파이어베이스 스토리지 서비스]
 * 이미지 업로드 및 삭제를 담당하며, 생성된 URL은 Supabase DB 저장용으로 사용됩니다.
 */
export const FirebaseStorageService = {
  /**
   * [이미지 업로드]
   * @param file 업로드할 파일 객체
   * @param path 저장 경로 (예: 'profiles', 'chats')
   * @returns 업로드된 이미지의 public URL
   */
  async uploadImage(file: File, path: StoragePath): Promise<UploadResult> {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `${path}/${fileName}`);

      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // 반환값을 객체로 만들어 필요한 정보를 더 많이 전달할 수 있음
      return {
        url,
        fileName,
        size: file.size,
      };
    } catch (error) {
      // 에러 타입 가드
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`[Firebase Upload Error]: ${errorMessage}`);
    }
  },

  /**
   * [이미지 삭제]
   * @param url 삭제할 이미지의 full URL
   */
  async deleteImage(url: string): Promise<void> {
    try {
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Firebase Delete Error:", error);
    }
  },
};
