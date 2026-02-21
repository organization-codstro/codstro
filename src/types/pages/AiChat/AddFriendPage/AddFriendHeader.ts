import { VIEW_TYPE } from "../../../../constants/AiChat/aiChat";

export interface HeaderProps {
  view: VIEW_TYPE;
  setView: (view: VIEW_TYPE) => void;
  onBack: () => void;
}
