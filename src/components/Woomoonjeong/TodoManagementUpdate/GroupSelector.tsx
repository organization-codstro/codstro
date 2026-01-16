import React from "react";
import { GroupSelectorProps } from "../../../types/pages/Woomoonjeong/TodoManagementUpdate/FieldSelector";

const GroupSelector: React.FC<GroupSelectorProps> = ({
  groups,
  selectedId,
  onSelect,
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      Related Group
    </label>
    <div className="flex flex-wrap gap-2">
      {groups.map((group) => (
        <button
          key={group.group_id} // UUID를 키로 사용
          type="button"
          onClick={() => onSelect(group.group_id)} // UUID를 전달
          className={`px-4 py-2 rounded-lg border transition-colors ${
            selectedId === group.group_id // UUID 일치 여부 확인
              ? "bg-[#587CF0] text-white border-[#587CF0]"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {group.group_name}
        </button>
      ))}
    </div>
  </div>
);

export default GroupSelector;
