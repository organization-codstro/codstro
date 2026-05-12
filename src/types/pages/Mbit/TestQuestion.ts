export type TestQuestionProps = {
  content: string;
  scale: number[];
  onAnswer: (value: number) => void;
  currentIndex: number;
  total: number;
  answeredCount: number;
  selectedValue: number | null;
  allAnswered: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
};
