import { QuestionOption } from "../../../common/Mbit";

export interface PersonalityTestQuestionProps {
  question: string;
  options: QuestionOption[];
  onAnswer: (type: string) => void;
}
