interface QuestionOption {
  text: string;
  major: string;
}

export interface TestQuestionProps {
  question: string;
  options: QuestionOption[];
  onAnswer: (major: string) => void;
}
