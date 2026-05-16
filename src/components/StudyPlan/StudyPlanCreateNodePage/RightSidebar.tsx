import { X } from "lucide-react";
import { EmptySearchState } from "./EmptySearchState";
import { TechStackGrid } from "./TechStackGrid";
import { TechStackSearchBar } from "./TechStackSearchBar";
import { NodeEditForm } from "./NodeEditForm";
import { RightSidebarProps } from "../../../types/pages/StudyPlan/StudyPlanCreateNodePage/RightSidebar";

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
