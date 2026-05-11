export type TestQuestionProps = {
  content: string;
  scale: number[];
  onAnswer: (value: number) => void;
  currentIndex: number;
  total: number;
  onPrev: () => void;
};
