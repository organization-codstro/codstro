import { StudyPlanNode } from "./StudyPlanCreateNodePage";

export type ValidationErrors = {
  name: boolean;
  startDate: boolean;
  endDate: boolean;
};

export type NodeEditFormProps = {
  /** 현재 편집 중인 노드 */
  editingNode: StudyPlanNode;

  /** 필드별 검증 에러 상태 */
  validationErrors: ValidationErrors;

  /** 노드 상태 변경 */
  onNodeChange: React.Dispatch<React.SetStateAction<StudyPlanNode | null>>;

  /** 특정 필드 에러 초기화 */
  onClearError: (field: keyof ValidationErrors) => void;

  /** 저장 */
  onSave: () => void;

  /** 취소 */
  onCancel: () => void;
};
