import React from "react";
import { BookOpen } from "lucide-react";
import { StudyPlanNode } from "../../../types/Woomoonkyung/Woomoonkyung";
import NodeItem from "./NodeItem";
import { NodeListProps } from "../../../types/Woomoonkyung/RecommendedStudyPlanDetailPage/NodeList";

const NodeList: React.FC<NodeListProps> = ({ nodes }) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Learning Path
      </h3>

      {nodes.length > 0 ? (
        <div className="space-y-4">
          {nodes.map((node) => (
            <NodeItem key={node.study_plan_node_id} node={node} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">This study plan has no nodes yet.</p>
        </div>
      )}
    </div>
  );
};

export default NodeList;
