import { FortuneList } from "../../../common/Mbit";

export interface FortuneItemCardProps {
  fortune: FortuneList;
  onClick: (fortuneId: string) => void;
}
