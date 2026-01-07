import React from "react";
import { GripVertical, Calendar, Trash2 } from "lucide-react";
import { StudyPlanNode } from "../../../types/Woomoonkyung/StudyPlanNode";

interface DraggableNodeItemProps {
  node: StudyPlanNode;
  index: number;
  isDragging: boolean;
  isEditing: boolean;
  deletePending: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onClick: () => void;
  onDeleteClick: (e: React.MouseEvent, nodeId: number) => void;
}

const DraggableNodeItem: React.FC<DraggableNodeItemProps> = ({
  node,
  index,
  isDragging,
  isEditing,
  deletePending,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
  onDeleteClick,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isDragging ? "opacity-50 scale-95" : ""
      } ${
        isEditing
          ? "border-[#587CF0] bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className="cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#587CF0] text-white text-sm font-medium flex-shrink-0">
          {node.position}
        </div>

        <div className="flex-shrink-0 w-10 h-10 p-1 bg-white border border-gray-100 rounded-lg">
          <img
            src={node.tech_stack_img_url}
            alt={node.tech_stack_name}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="mb-1 font-semibold text-gray-800">
            {node.study_plan_node_name}
          </h4>
          <p className="text-sm text-gray-600 truncate">
            {node.description || "설명이 없습니다"}
          </p>
          {node.start_date && node.end_date && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                {node.start_date} ~ {node.end_date}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={(e) => onDeleteClick(e, node.study_plan_node_id)}
          className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
            deletePending
              ? "bg-red-500 text-white hover:bg-red-600 shadow-md scale-110"
              : "text-gray-400 hover:text-red-500 hover:bg-red-50"
          }`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DraggableNodeItem;
