import { TechStack } from "../../../api/StudyPlan/StudyPlanEditNodePage";

export interface TechStackPickerProps {
  techStacks: TechStack[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddStack: (stack: TechStack) => void;
}
