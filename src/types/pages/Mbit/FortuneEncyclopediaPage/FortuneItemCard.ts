import { Fortune } from "../Mbit";

export interface FortuneItemCardProps {
  fortune: Fortune;
  onClick: (fortune: Fortune) => void;
}
