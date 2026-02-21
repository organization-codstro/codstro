import { QuestionOption } from "../../../common/Mbit";

export interface TestQuestionProps {
  question: string;
  options: QuestionOption[];
  onAnswer: (major: string) => void;
}
