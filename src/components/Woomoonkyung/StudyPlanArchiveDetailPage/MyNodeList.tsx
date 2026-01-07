import React from "react";
import MyNodeItem from "./MyNodeItem";
import { StudyPlanNode } from "../../../types/Woomoonkyung/StudyPlanNode";
import EmptyState from "../RecommendedStudyPlansPage/EmptyState";

interface MyNodeListProps {
  nodes: StudyPlanNode[];
}

const MyNodeList: React.FC<MyNodeListProps> = ({ nodes }) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Study Plan Nodes
      </h3>

      {nodes.length > 0 ? (
        <div className="space-y-4">
          {nodes.map((node) => (
            <MyNodeItem key={node.study_plan_node_id} node={node} />
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
