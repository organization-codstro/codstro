import React from "react";
import { Code } from "lucide-react";

export const NoResults: React.FC = () => {
  return (
    <div className="p-12 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50">
        <Code className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">No projects found</h3>
      <p className="mt-1 text-gray-500">다른 필터나 검색어를 시도해 보세요.</p>
    </div>
  );
};
