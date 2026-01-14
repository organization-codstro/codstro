import { NodeListProps } from "../../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/NodeList";
import { EmptyNodeState } from "./EmptyNodeState";
import { NodeCard } from "./NodeCard";

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
