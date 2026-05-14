import { Search } from "lucide-react";
import { ConceptSearchBarProps } from "../../../types/pages/Concept/ConceptListPage/ConceptSearchBar";
import { useState } from "react";

export const ConceptSearchBar = ({ onSearch }: ConceptSearchBarProps) => {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value); // 엔터 시 검색 실행
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          placeholder="Search concepts..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
