import React from "react";
import MyNodeItem from "./MyNodeItem";
import EmptyState from "../RecommendedStudyPlansPage/EmptyState";
import { MyNodeListProps } from "../../../types/pages/Woomoonkyung/StudyPlanArchiveDetailPage/MyNodeList";

// 1. props에서 onToggleNode를 받아옵니다.
const MyNodeList: React.FC<MyNodeListProps> = ({ nodes, onToggleNode }) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Study Plan Nodes
      </h3>

      {nodes.length > 0 ? (
        <div className="space-y-4">
          {nodes.map((node) => (
            // 2. MyNodeItem에게 onToggleNode 함수를 전달합니다.
            <MyNodeItem
              key={node.study_plan_node_id}
              node={node}
              onToggleNode={onToggleNode}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No study nodes yet"
          description="This study plan doesn't have any nodes configured yet."
        />
      )}
    </div>
  );
};

export default MyNodeList;
