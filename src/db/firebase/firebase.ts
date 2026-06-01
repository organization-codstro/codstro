import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UploadResult } from "../../types/db/firebase/firebase";
import { compressFile } from "../../utils/file/compression";

// Firebase 설정 (Vite 환경변수)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * Firebase Storage path 로 다운로드 URL 생성
 */
export const getFirebaseImageUrl = async (
  path: string,
): Promise<string | null> => {
  try {
    if (!path) return null;

    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Firebase image url error:", error);
    return null;
  }
};

/**
 * 파일 배열을 압축 후 Firebase Storage에 업로드하고 URL 배열을 반환합니다.
 *
 * @param files       업로드할 파일 배열
 * @param storagePath Firebase Storage 저장 경로
 * @returns           업로드된 파일들의 다운로드 URL 배열
 */
export const uploadFilesToStorage = async (
  files: File[],
  storagePath: string,
): Promise<UploadResult[]> => {
  if (files.length === 0 || !storagePath) return [];

  const results = await Promise.allSettled(
    files.map(async (file) => {
      // 1. 압축
      const compressedFile = await compressFile(file);

      // 2. 고유 파일명 생성 (충돌 방지)
      const uniqueName = `${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 7)}_${compressedFile.name}`;
      const path = `${storagePath}/${uniqueName}`;
      const fileRef = ref(storage, path);

      // 3. 업로드
      await uploadBytes(fileRef, compressedFile, {
        contentType: compressedFile.type || "application/octet-stream",
      });

      // 4. 다운로드 URL 획득
      const url = await getDownloadURL(fileRef);

      return {
        url,
        path,
        fileName: file.name, // 원본 파일명
        fileType: file.type, // 원본 MIME 타입
        size: compressedFile.size, // 압축된 파일 크기
      } satisfies UploadResult;
    }),
  );

  // 실패한 항목은 경고 출력 후 제외
  const urls: UploadResult[] = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      urls.push(result.value);
    } else {
      console.warn(`파일 업로드 실패 [${files[i].name}]:`, result.reason);
    }
  });

  return urls;
};

/**
 * 지정한 Firebase Storage 전체 경로에 파일 1개를 업로드합니다.
 *
 * @param file            업로드할 파일
 * @param storageFullPath 파일명을 포함한 Firebase Storage 전체 경로
 */
export const uploadFileToStoragePath = async (
  file: File,
  storageFullPath: string,
): Promise<UploadResult> => {
  const compressedFile = await compressFile(file);
  const fileRef = ref(storage, storageFullPath);

  await uploadBytes(fileRef, compressedFile, {
    contentType: compressedFile.type || file.type || "application/octet-stream",
  });

  const url = await getDownloadURL(fileRef);

  return {
    url,
    path: storageFullPath,
    fileName: file.name,
    fileType: file.type,
    size: compressedFile.size,
  } satisfies UploadResult;
};
