export interface FortuneList {
  id: string;
  code: number;
  name: string;
  summary: string;
}

export interface FortuneItemCardProps {
  fortune: FortuneList;
  onClick: (fortuneId: string) => void;
}
