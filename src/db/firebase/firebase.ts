import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

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
