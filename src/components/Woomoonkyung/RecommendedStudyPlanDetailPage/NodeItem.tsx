import React from "react";
import { Calendar } from "lucide-react";
import { NodeItemProps } from "../../../types/Woomoonkyung/RecommendedStudyPlanDetailPage/NodeItem";

const NodeItem: React.FC<NodeItemProps> = ({ node }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-[#587CF0] transition-colors">
      <div className="flex gap-3">
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-[#587CF0] text-white text-sm font-medium">
          {node.position}
        </div>
        <div>
          <h4 className="mb-1 font-semibold text-gray-800">
            {node.study_plan_node_name}
          </h4>
          <p className="mb-2 text-sm text-gray-600">{node.description}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {new Date(node.start_date).toLocaleDateString()} -{" "}
            {new Date(node.end_date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeItem;
