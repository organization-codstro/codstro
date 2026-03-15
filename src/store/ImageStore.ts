import { create } from "zustand";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../db/firebase/firebase";
interface ImageStore {
  cache: Record<string, string>;
  getUrl: (src: string) => Promise<string | null>;
}

const isExternalUrl = (src: string) => {
  return src.startsWith("http://") || src.startsWith("https://");
};

export const useImageStore = create<ImageStore>((set, get) => ({
  cache: {},

  getUrl: async (src: string) => {
    if (!src) return null;

    const cached = get().cache[src];
    if (cached) return cached;

    try {
      let finalUrl = src;

      if (!isExternalUrl(src)) {
        const storageRef = ref(storage, src);
        finalUrl = await getDownloadURL(storageRef);
      }

      set((state) => ({
        cache: {
          ...state.cache,
          [src]: finalUrl,
        },
      }));

      return finalUrl;
    } catch (e) {
      console.error("image load error", e);
      return null;
    }
  },
}));
