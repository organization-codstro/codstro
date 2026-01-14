interface Option {
  text: string;
  type: string;
}

export interface PersonalityTestQuestionProps {
  question: string;
  options: Option[];
  onAnswer: (type: string) => void;
}
