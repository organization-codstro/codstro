import { Search, X } from "lucide-react";

export type TechStackSearchBarProps = {
  /** 검색어 */
  value: string;

  /** 검색어 변경 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** 검색어 초기화 */
  onClear: () => void;
};

export const TechStackSearchBar = ({
  value,
  onChange,
  onClear,
}: TechStackSearchBarProps) => (
  <div className="relative">
    <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Tech Stack 검색..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);
