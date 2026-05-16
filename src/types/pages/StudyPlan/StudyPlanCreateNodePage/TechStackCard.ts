type TechStack = {
  tech_stack_id: string;
  tech_stack_name: string;
  tech_stack_img_url: string;
  tech_stack_created_date: string;
};

export type TechStackCardProps = {
  /** 표시할 기술 스택 */
  techStack: TechStack;

  /** 카드 클릭 */
  onClick: (techStack: TechStack) => void;
};
