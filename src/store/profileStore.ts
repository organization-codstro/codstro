import { create } from "zustand";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../db/firebase/firebase";
import { ProfileService } from "../api/Profile/Profile";

interface UserProfile {
  name: string;
  email: string;
  profilePath: string | null;
}

interface UserStore {
  profile: UserProfile | null;
  profileImageUrl: string | null;
  isLoading: boolean;
  fetchProfile: (userId: string) => Promise<void>;
}

const isExternalUrl = (src: string) =>
  src.startsWith("http://") || src.startsWith("https://");

const resolveImageUrl = async (profilePath: string): Promise<string | null> => {
  try {
    if (isExternalUrl(profilePath)) return profilePath;
    const storageRef = ref(storage, profilePath);
    return await getDownloadURL(storageRef);
  } catch (e) {
    console.error("[useUserStore] 이미지 URL 변환 실패:", e);
    return null;
  }
};

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  profileImageUrl: null,
  isLoading: false,

  fetchProfile: async (userId: string) => {
    set({ isLoading: true });

    try {
      const { userData } = await ProfileService.getUserFullProfile({ userId });

      const profile: UserProfile = {
        name: userData.name,
        email: userData.email,
        profilePath: userData.profilePath ?? null,
      };

      const profileImageUrl = profile.profilePath
        ? await resolveImageUrl(profile.profilePath)
        : null;

      set({ profile, profileImageUrl, isLoading: false });
    } catch (error) {
      console.error("[useUserStore.fetchProfile Error]:", error);
      set({ isLoading: false });
    }
  },
}));