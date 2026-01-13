import { StudyPlanNode } from "../../../types/pages/Woomoonkyung/Woomoonkyung";
import { EmptyNodeState } from "./EmptyNodeState";
import { NodeCard } from "./NodeCard";

export type NodeListProps = {
  /** 전체 노드 목록 */
  nodes: StudyPlanNode[];

  /** 현재 드래그 중인 노드 index */
  draggedItem: number | null;

  /** 현재 편집 중인 노드 */
  editingNode: StudyPlanNode | null;

  /** 삭제 대기 중인 노드 id */
  deletePendingNodeId: number | null;

  /** 드래그 시작 */
  onDragStart: (e: React.DragEvent, index: number) => void;

  /** 드래그 오버 */
  onDragOver: (e: React.DragEvent, index: number) => void;

  /** 드래그 종료 */
  onDragEnd: () => void;

  /** 노드 클릭 */
  onNodeClick: (node: StudyPlanNode) => void;

  /** 노드 삭제 클릭 */
  onDeleteClick: (e: React.MouseEvent, nodeId: number) => void;
};

export const NodeList = ({
  nodes,
  draggedItem,
  editingNode,
  deletePendingNodeId,
  onDragStart,
  onDragOver,
  onDragEnd,
  onNodeClick,
  onDeleteClick,
}: NodeListProps) => (
  <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-800">
        학습 노드 ({nodes.length})
      </h2>
    </div>

    {nodes.length === 0 ? (
      <EmptyNodeState />
    ) : (
      <div className="space-y-3">
        {nodes.map((node, index) => (
          <NodeCard
            key={node.study_plan_node_id}
            node={node}
            index={index}
            draggedItem={draggedItem}
            editingNode={editingNode}
            deletePendingNodeId={deletePendingNodeId}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onClick={onNodeClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    )}
  </div>
);
