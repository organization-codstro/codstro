import { StudyPlanNode } from "../Woomoonkyung";

type TechStack = {
  tech_stack_id: string;
  tech_stack_name: string;
  tech_stack_img_url: string;
  tech_stack_created_date: string;
};

export type ValidationErrors = {
  name: boolean;
  startDate: boolean;
  endDate: boolean;
};

export type RightSidebarProps = {
  /** 사이드바 모드 */
  mode: "techStacks" | "editNode";

  /** 검색어 */
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;

  /** 기술 스택 */
  filteredTechStacks: TechStack[];
  onTechStackClick: (techStack: TechStack) => void;

  /** 노드 편집 */
  editingNode: StudyPlanNode | null;
  validationErrors: ValidationErrors;

  /** 노드 상태 변경 */
  onNodeChange: React.Dispatch<React.SetStateAction<StudyPlanNode | null>>;

  /** 검증 에러 초기화 */
  onClearError: (field: keyof ValidationErrors) => void;

  /** 편집 저장 / 취소 */
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};
