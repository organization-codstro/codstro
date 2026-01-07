import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { FieldDetailHeaderProps } from "../../../types/Woomoonjeong/FieldDetailPage/FieldDetailHeader";

const FieldDetailHeader: React.FC<FieldDetailHeaderProps> = ({
  fieldName,
  groupName,
  groupColorClass,
  description,
  onBack,
  onAddField,
}) => (
  <div className="px-8 py-6 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between mx-auto max-w-7xl">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{fieldName}</h1>
            <span
              className={`inline-block px-3 py-1 text-sm border rounded-full ${groupColorClass}`}
            >
              {groupName}
            </span>
          </div>
          <p className="mt-1 text-gray-600">{description}</p>
        </div>
      </div>
      <button
        onClick={onAddField}
        className="flex items-center px-4 py-2 gap-2 font-medium text-white rounded-lg bg-[#587CF0]"
      >
        <Plus className="w-4 h-4" />
        Add Field
      </button>
    </div>
  </div>
);

export default FieldDetailHeader;
