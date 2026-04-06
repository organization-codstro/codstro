import { Emoticon } from "../common/AiChat";

export interface EmoticonStore {
  cache: Record<string, Emoticon>; // emoticon_id -> Emoticon
  setEmoticons: (emoticons: Emoticon[]) => void;
  getEmoticon: (id: string) => Emoticon | null;
}
