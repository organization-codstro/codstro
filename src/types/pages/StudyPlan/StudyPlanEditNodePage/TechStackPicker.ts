import { TechStack } from "../../../common/StudyPlan";

export interface TechStackPickerProps {
  techStacks: TechStack[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddStack: (stack: TechStack) => void;
}
