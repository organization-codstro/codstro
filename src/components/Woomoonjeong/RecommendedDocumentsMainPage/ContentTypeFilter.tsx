import React from "react";
import { Filter } from "lucide-react";
import { ContentTypeFilterProps } from "../../../types/pages/Woomoonjeong/RecommendedDocumentsMainPage/ContentTypeFilter";

const ContentTypeFilter: React.FC<ContentTypeFilterProps> = ({
  contentType,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-700">Content Type:</span>
      {(["documents", "fields"] as const).map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
            contentType === type
              ? "bg-[#587CF0] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {type === "documents" ? "Documents" : "Fields"}
        </button>
      ))}
    </div>
  );
};

export default ContentTypeFilter;
