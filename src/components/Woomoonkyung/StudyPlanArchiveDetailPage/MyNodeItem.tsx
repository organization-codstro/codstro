import React from "react";
import { Calendar, CheckCircle2, Circle } from "lucide-react"; // Circle 추가
import { MyNodeItemProps } from "../../../types/pages/Woomoonkyung/StudyPlanArchiveDetailPage/MyNodeItem";

const MyNodeItem: React.FC<MyNodeItemProps> = ({ node, onToggleNode }) => {
  return (
    <div
      className={`p-4 border rounded-xl transition-all ${
        node.study_plan_node_completed
          ? "bg-gray-50 border-gray-100"
          : "bg-white border-purple-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1 gap-3">
          {/* 포지션 번호: 완료 시 색상 변경 */}
          <div
            className={`flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full text-sm font-medium transition-colors ${
              node.study_plan_node_completed
                ? "bg-gray-300 text-white"
                : "bg-[#587CF0] text-white"
            }`}
          >
            {node.study_plan_node_position}
          </div>

          <div className="flex-1">
            <h4
              className={`font-semibold mb-1 transition-colors ${
                node.study_plan_node_completed
                  ? "text-gray-400 line-through"
                  : "text-gray-800"
              }`}
            >
              {node.study_plan_node_name}
            </h4>
            <p
              className={`text-sm mb-3 transition-colors ${
                node.study_plan_node_completed
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {node.study_plan_node_description}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                {node.study_plan_node_start_date
                  ? new Date(
                      node.study_plan_node_start_date
                    ).toLocaleDateString()
                  : "-"}{" "}
                -{" "}
                {node.study_plan_node_end_date
                  ? new Date(node.study_plan_node_end_date).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* 토글 버튼: 클릭 시 onToggleNode 호출 */}
        <button
          onClick={() =>
            onToggleNode(
              node.study_plan_node_id,
              node.study_plan_node_completed
            )
          }
          className="flex-shrink-0 ml-4 hover:scale-110 transition-transform"
        >
          {node.study_plan_node_completed ? (
            <CheckCircle2 className="w-7 h-7 text-green-500 fill-green-50" />
          ) : (
            <Circle className="w-7 h-7 text-gray-300 hover:text-[#587CF0]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MyNodeItem;
