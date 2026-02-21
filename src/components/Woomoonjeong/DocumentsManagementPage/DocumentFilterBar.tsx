import React from "react";
import { Filter, Search } from "lucide-react";
import { GROUP_TYPES } from "../../../constants/Woomoonjeong/woomoonjeong";
import { DocumentFilterBarProps } from "../../../types/pages/Woomoonjeong/DocumentsManagementPage/DocumentFilterBar";

const DocumentFilterBar: React.FC<DocumentFilterBarProps> = ({
  selectedGroupType,
  onSelectType,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Group Type:</span>
          <div className="flex flex-wrap gap-2">
            {GROUP_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onSelectType(type)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedGroupType === type
                    ? "bg-[#587CF0] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center flex-1 min-w-[200px] gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentFilterBar;
