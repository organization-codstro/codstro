import { Fortune } from "../Mbit";

export interface FortuneItemCardProps {
  fortune: Fortune;
  onClick: (fortuneId: string) => void;
}
