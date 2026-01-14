import { TechStackGridProps } from "../../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/TechStackGrid";
import { TechStackCard } from "./TechStackCard";

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
