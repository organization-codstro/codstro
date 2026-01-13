import { TechStack } from "./RightSidebar";
import { TechStackCard } from "./TechStackCard";

export type TechStackGridProps = {
  /** 표시할 기술 스택 목록 */
  techStacks: TechStack[];

  /** 기술 스택 클릭 */
  onTechStackClick: (techStack: TechStack) => void;
};

export const TechStackGrid = ({
  techStacks,
  onTechStackClick,
}: TechStackGridProps) => (
  <div className="grid grid-cols-2 gap-4">
    {techStacks.map((techStack) => (
      <TechStackCard
        key={techStack.tech_stack_id}
        techStack={techStack}
        onClick={onTechStackClick}
      />
    ))}
  </div>
);
