import { X } from "lucide-react";
import { EmptySearchState } from "./EmptySearchState";
import { TechStackGrid } from "./TechStackGrid";
import { TechStackSearchBar } from "./TechStackSearchBar";
import { NodeEditForm } from "./NodeEditForm";
import { StudyPlanNode } from "../../../types/pages/Woomoonkyung/Woomoonkyung";

export type TechStack = {
  tech_stack_id: number;
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

export const RightSidebar = ({
  mode,
  searchQuery,
  onSearchChange,
  onSearchClear,
  filteredTechStacks,
  onTechStackClick,
  editingNode,
  validationErrors,
  onNodeChange,
  onClearError,
  onSaveEdit,
  onCancelEdit,
}: RightSidebarProps) => (
  <div className="flex-shrink-0 overflow-y-auto bg-white border-l border-purple-100 shadow-lg w-96">
    {mode === "techStacks" ? (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold text-gray-800">Tech Stacks</h2>
          <p className="mb-4 text-sm text-gray-600">
            학습하고 싶은 기술 스택을 선택하세요
          </p>

          <TechStackSearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onSearchClear}
          />
        </div>

        {filteredTechStacks.length === 0 ? (
          <EmptySearchState searchQuery={searchQuery} />
        ) : (
          <TechStackGrid
            techStacks={filteredTechStacks}
            onTechStackClick={onTechStackClick}
          />
        )}
      </div>
    ) : (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">노드 편집</h2>
          <button
            onClick={onCancelEdit}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {editingNode && (
          <NodeEditForm
            editingNode={editingNode}
            validationErrors={validationErrors}
            onNodeChange={onNodeChange}
            onClearError={onClearError}
            onSave={onSaveEdit}
            onCancel={onCancelEdit}
          />
        )}
      </div>
    )}
  </div>
);
