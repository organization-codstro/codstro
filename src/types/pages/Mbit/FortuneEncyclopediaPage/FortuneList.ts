import { Fortune } from "../Mbit";

export interface FortuneListProps {
  fortunes: Fortune[];
  onSelectFortune: (fortune: Fortune) => void;
}
