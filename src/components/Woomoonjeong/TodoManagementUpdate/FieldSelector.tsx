import React from "react";

interface Props {
  fields: string[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const FieldSelector: React.FC<Props> = ({ fields, selectedId, onSelect }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      Related Field
    </label>
    <div className="flex flex-wrap gap-2">
      {fields.map((field, index) => (
        <button
          key={field}
          type="button"
          onClick={() => onSelect(index + 1)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            selectedId === index + 1
              ? "bg-[#587CF0] text-white border-[#587CF0]"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {field}
        </button>
      ))}
    </div>
  </div>
);

export default FieldSelector;
