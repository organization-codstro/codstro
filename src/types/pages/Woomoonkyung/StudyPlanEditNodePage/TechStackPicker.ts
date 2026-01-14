interface TechStack {
  tech_stack_id: string;
  tech_stack_name: string;
  tech_stack_img_url: string;
}

export interface TechStackPickerProps {
  techStacks: TechStack[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddStack: (stack: TechStack) => void;
}