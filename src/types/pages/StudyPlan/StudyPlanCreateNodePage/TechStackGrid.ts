import { TechStack } from "../../../common/StudyPlan";

export type TechStackGridProps = {
  /** 표시할 기술 스택 목록 */
  techStacks: TechStack[];

  /** 기술 스택 클릭 */
  onTechStackClick: (techStack: TechStack) => void;
};
