import React from "react";
import { useNavigate } from "react-router-dom";
import MyNodeItem from "./MyNodeItem";
import EmptyState from "../RecommendedStudyPlansPage/EmptyState";
import { MyNodeListProps } from "../../../types/pages/Woomoonkyung/StudyPlanArchiveDetailPage/MyNodeList";
import { Edit3 } from "lucide-react";

const MyNodeList: React.FC<MyNodeListProps> = ({
  nodes,
  onToggleNode,
  planId,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Study Plan Nodes
        </h3>
        <button
          onClick={() => navigate(`/woomoonkyung/${planId}/nodes`)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:text-blue-500 hover:border-blue-300 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit
        </button>
      </div>

      {nodes.length > 0 ? (
        <div className="space-y-4">
          {nodes.map((node) => (
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
