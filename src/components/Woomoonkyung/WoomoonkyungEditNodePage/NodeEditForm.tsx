import React from "react";
import { X } from "lucide-react";
import { NodeEditFormProps } from "../../../types/Woomoonkyung/WoomoonkyungEditNodePage/NodeEditForm";

const NodeEditForm: React.FC<NodeEditFormProps> = ({
  node,
  errors,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">노드 편집</h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-3 p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
          <img
            src={node.tech_stack_img_url}
            alt=""
            className="w-12 h-12 p-2 bg-white rounded-lg"
          />
          <div>
            <p className="text-xs text-gray-500">기반 Tech Stack</p>
            <p className="font-semibold text-gray-800">
              {node.tech_stack_name}
            </p>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            노드 이름 *
          </label>
          <input
            type="text"
            value={node.study_plan_node_name}
            onChange={(e) =>
              onChange({ ...node, study_plan_node_name: e.target.value })
            }
            className={`w-full px-4 py-3 border rounded-lg outline-none ${
              errors.name
                ? "border-red-500 bg-red-50"
                : "border-gray-300 focus:ring-2 focus:ring-[#587CF0]"
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            설명
          </label>
          <textarea
            value={node.description}
            onChange={(e) => onChange({ ...node, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              시작일 *
            </label>
            <input
              type="date"
              value={node.start_date}
              onChange={(e) =>
                onChange({ ...node, start_date: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              종료일 *
            </label>
            <input
              type="date"
              value={node.end_date}
              onChange={(e) => onChange({ ...node, end_date: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.endDate ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={onSave}
            className="w-full py-3 bg-[#587CF0] text-white rounded-lg font-semibold shadow-md hover:bg-[#4a6de8]"
          >
            저장
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeEditForm;
