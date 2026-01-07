import React from "react";
import { Search } from "lucide-react";

interface PlanSearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PlanSearchHeader: React.FC<PlanSearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Recommended Study Plans
        </h1>
        <p className="text-gray-600">
          Discover curated study plans created by experts
        </p>
      </div>
      <div className="relative">
        <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          placeholder="Search plans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent bg-white transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default PlanSearchHeader;
