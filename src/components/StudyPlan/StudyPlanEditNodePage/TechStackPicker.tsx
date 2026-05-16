import React from "react";
import { Search, X } from "lucide-react";
import { TechStackPickerProps } from "../../../types/pages/StudyPlan/StudyPlanEditNodePage/TechStackPicker";

export const TechStackPicker: React.FC<TechStackPickerProps> = ({
  techStacks,
  searchQuery,
  onSearchChange,
  onAddStack,
}) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold text-gray-800">Tech Stacks</h2>
        <p className="mb-4 text-sm text-gray-600">
          학습하고 싶은 기술 스택을 선택하세요
        </p>
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tech Stack 검색..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {techStacks.map((stack) => (
          <button
            key={stack.tech_stack_id}
            onClick={() => onAddStack(stack)}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#587CF0] hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center justify-center p-2 mb-3 bg-white rounded-lg aspect-square">
              <img
                src={stack.tech_stack_img_url}
                alt={stack.tech_stack_name}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm font-medium text-gray-800 text-center group-hover:text-[#587CF0]">
              {stack.tech_stack_name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
