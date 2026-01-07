import React from "react";
import { Search } from "lucide-react";
import { SearchInputProps } from "../../../types/Woomoonjeong/RecommendedDocumentsMainPage/SearchInput";

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                   focus:ring-2 focus:ring-[#587CF0]
                   focus:border-transparent bg-white
                   transition-all duration-200 w-full"
      />
    </div>
  );
};

export default SearchInput;
