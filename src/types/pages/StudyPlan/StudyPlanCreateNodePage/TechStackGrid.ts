type TechStack = {
  tech_stack_id: string;
  tech_stack_name: string;
  tech_stack_img_url: string;
  tech_stack_created_date: string;
};

export type TechStackGridProps = {
  /** 표시할 기술 스택 목록 */
  techStacks: TechStack[];

  /** 기술 스택 클릭 */
  onTechStackClick: (techStack: TechStack) => void;
};
