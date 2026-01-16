import { NodeEditFormProps } from "../../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/NodeEditForm";
import { NodeEditFormField } from "./NodeEditFormField";
import { TechStackInfoDisplay } from "./TechStackInfoDisplay";

export const NodeEditForm = ({
  editingNode,
  validationErrors,
  onNodeChange,
  onClearError,
  onSave,
  onCancel,
}: NodeEditFormProps) => (
  <div className="space-y-5">
    <TechStackInfoDisplay node={editingNode} />

    <NodeEditFormField
      label="노드 이름"
      value={editingNode.study_plan_node_name}
      onChange={(e) => {
        onNodeChange({ ...editingNode, study_plan_node_name: e.target.value });
        onClearError("name");
      }}
      placeholder="예: JavaScript 기초"
      error={validationErrors.name ? "노드 이름을 입력해 주세요." : null}
      required
    />

    <NodeEditFormField
      label="설명"
      type="textarea"
      value={editingNode.study_plan_node_description}
      onChange={(e) =>
        onNodeChange({ ...editingNode, study_plan_node_description: e.target.value })
      }
      placeholder="학습 내용을 상세하게 설명하세요"
      rows={4}
    />

    <NodeEditFormField
      label="시작일"
      type="date"
      value={editingNode.study_plan_node_start_date}
      onChange={(e) => {
        onNodeChange({ ...editingNode, study_plan_node_start_date: e.target.value });
        onClearError("startDate");
      }}
      error={validationErrors.startDate ? "시작일을 선택해 주세요." : null}
      required
    />

    <NodeEditFormField
      label="종료일"
      type="date"
      value={editingNode.study_plan_node_end_date}
      onChange={(e) => {
        onNodeChange({ ...editingNode, study_plan_node_end_date: e.target.value });
        onClearError("endDate");
      }}
      error={validationErrors.endDate ? "종료일을 선택해 주세요." : null}
      required
    />

    <div className="pt-4 space-y-3">
      <button
        onClick={onSave}
        className="w-full py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-all font-semibold shadow-md"
      >
        저장
      </button>
      <button
        onClick={onCancel}
        className="w-full py-3 font-medium text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        취소
      </button>
    </div>
  </div>
);
