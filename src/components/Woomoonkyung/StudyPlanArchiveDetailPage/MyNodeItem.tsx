import React from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { StudyPlanNode } from "../../../types/Woomoonkyung/StudyPlanNode";

interface MyNodeItemProps {
  node: StudyPlanNode;
}

const MyNodeItem: React.FC<MyNodeItemProps> = ({ node }) => {
  const isCompleted = node.completed;

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        isCompleted
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white hover:border-blue-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1 gap-3">
          <div className="flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full bg-[#587CF0] text-white text-sm font-medium">
            {node.position}
          </div>
          <div className="flex-1">
            <h4
              className={`font-semibold text-gray-800 mb-1 ${
                isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {node.study_plan_node_name}
            </h4>
            <p
              className={`text-sm text-gray-600 mb-3 ${
                isCompleted ? "line-through" : ""
              }`}
            >
              {node.description}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(node.start_date).toLocaleDateString()} -{" "}
                {new Date(node.end_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-4">
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNodeItem;
