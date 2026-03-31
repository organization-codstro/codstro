import { Emoticon } from "../../../../common/AiChat";

export interface EmoticonPreviewProps {
  emoticon: Emoticon;
  emoticonUrl: string | null;
  onCancel: () => void;
}
