import { create } from "zustand";
import { Emoticon } from "../types/common/AiChat";

interface EmoticonStore {
  cache: Record<string, Emoticon>; // emoticon_id -> Emoticon
  setEmoticons: (emoticons: Emoticon[]) => void;
  getEmoticon: (id: string) => Emoticon | null;
}

export const useEmoticonStore = create<EmoticonStore>((set, get) => ({
  cache: {},

  setEmoticons: (emoticons) => {
    set((state) => {
      const next = { ...state.cache };
      emoticons.forEach((e) => {
        next[e.emoticon_id] = e;
      });
      return { cache: next };
    });
  },

  getEmoticon: (id) => get().cache[id] ?? null,
}));
