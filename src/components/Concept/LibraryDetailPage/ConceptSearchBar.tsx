import { Search, Filter } from "lucide-react";
import { ConceptSearchBarProps } from "../../../types/pages/Concept/ConceptSearchBar";

export default function ConceptSearchBar({
  onSearchChange,
  onFilterClick,
}: ConceptSearchBarProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          placeholder="Search concepts..."
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Filter className="w-5 h-5" />
        Filter
      </button>
    </div>
  );
}
