import { Calendar, GripVertical, Trash2 } from "lucide-react";
import { NodeCardProps } from "../../../types/pages/StudyPlan/StudyPlanCreateNodePage/NodeCard";

export const NodeCard = ({
  node,
  index,
  draggedItem,
  editingNode,
  deletePendingNodeId,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
  onDeleteClick,
}: NodeCardProps) => (
  <div
    key={node.study_plan_node_id}
    draggable
    onDragStart={(e) => onDragStart(e, index)}
    onDragOver={(e) => onDragOver(e, index)}
    onDragEnd={onDragEnd}
    role="button"
    tabIndex={0}
    onClick={() => onClick(node)}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(node);
      }
    }}
    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
      draggedItem === index ? "opacity-50 scale-95" : ""
    } ${
      editingNode?.study_plan_node_id === node.study_plan_node_id
        ? "border-[#587CF0] bg-blue-50 shadow-md"
        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
    }`}
  >
    <div className="flex items-center gap-4">
      {/* Drag Handle */}
      <div
        className="cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Position Badge */}
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#587CF0] text-white text-sm font-medium flex-shrink-0">
        {node.study_plan_node_position}
      </div>

      {/* Tech Stack Image */}
      <div className="flex-shrink-0 w-10 h-10 p-1 bg-white rounded-lg">
        <img
          src={node.tech_stack_img_url}
          alt={node.tech_stack_name}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Node Info */}
      <div className="flex-1 min-w-0">
        <h4 className="mb-1 font-semibold text-gray-800">
          {node.study_plan_node_name}
        </h4>
        <p className="text-sm text-gray-600 truncate">
          {node.study_plan_node_description || "설명이 없습니다"}
        </p>
        {node.study_plan_node_start_date && node.study_plan_node_end_date && (
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(node.study_plan_node_start_date).toLocaleDateString()} -{" "}
              {new Date(node.study_plan_node_end_date).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (node.study_plan_node_id) {
            onDeleteClick(e, node.study_plan_node_id);
          }
        }}
        className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
          deletePendingNodeId === node.study_plan_node_id
            ? "bg-red-500 text-white hover:bg-red-600 shadow-md scale-110"
            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
        }`}
        title={
          deletePendingNodeId === node.study_plan_node_id
            ? "다시 클릭하여 삭제"
            : "삭제"
        }
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);
