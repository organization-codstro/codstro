import { create } from "zustand";
import { EmoticonStore } from "../types/store/emoticonStore";

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
