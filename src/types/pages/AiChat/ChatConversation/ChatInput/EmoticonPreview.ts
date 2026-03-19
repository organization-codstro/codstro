import { Emoticon } from "../../../../common/aiChat";

export interface EmoticonPreviewProps {
  emoticon: Emoticon;
  emoticonUrl: string | null;
  onCancel: () => void;
}
