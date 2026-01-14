/**
 * [ID 관리 전략: 클라이언트-서버 동기화]
 * * 1. 기존 데이터 (DB):
 * - study_plan_node_id는 DB에서 할당된 양의 정수(1, 2, 3...)를 사용합니다.
 * * 2. 신규 데이터 (Client-side):
 * - 사용자가 노드를 추가할 때, 드래그 앤 드롭(dnd-kit) 식별을 위해
 * Date.now()를 이용한 임시 ID(예: 1700000000000 이상의 큰 숫자)를 할당합니다.
 * * 3. 서버 전송 및 DB 저장 시 처리:
 * - handleSave 함수에서 id 값을 검사하여, 임시 ID(1조 이상)인 경우
 * 신규 생성 건으로 판단하고 study_plan_node_id를 undefined 또는 0으로 변환하여 송신합니다.
 * - DB 관리자는 전달받은 노드 리스트 중 PK가 없는 항목을 신규 INSERT 처리하면 됩니다.
 */

import React from "react";
import {
  GripVertical,
  Calendar,
  Trash2,
  CreditCard as Edit3,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableNodeItemNodeFormData } from "../../types/pages/Woomoonkyung/StudyPlanMainPage/SortableNodeItem";
import { TechStack } from "../../types/pages/Woomoonjeong/SortableNodeItem/sortableNodeItem";

export const SortableNodeItem: React.FC<{
  node: SortableNodeItemNodeFormData & { id: string };
  techStacks: TechStack[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ node, techStacks, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const techStack = techStacks.find(
    (ts) => ts.tech_stack_id === node.tech_stack_id
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-6 h-6 bg-[#587CF0] text-white text-sm font-medium rounded-full">
              {node.position}
            </span>
            <h4 className="font-medium text-gray-800">
              {node.study_plan_node_name}
            </h4>
            {techStack && (
              <span className="px-2 py-1 text-xs text-blue-700 border border-blue-200 rounded bg-blue-50">
                {techStack.tech_stack_name}
              </span>
            )}
          </div>
          <p className="mb-2 text-sm text-gray-600 line-clamp-1">
            {node.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {node.start_date} ~ {node.end_date}
              </span>
            </div>
            {node.completed && (
              <span className="px-2 py-0.5 text-green-700 bg-green-50 border border-green-200 rounded">
                완료됨
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(node.id)}
            className="p-2 text-gray-400 transition-colors hover:text-[#587CF0] hover:bg-blue-50 rounded-lg"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(node.id)}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
