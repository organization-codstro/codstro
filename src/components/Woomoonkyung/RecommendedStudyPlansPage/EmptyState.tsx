import React from "react";
import { BookOpen } from "lucide-react";
import { EmptyStateProps } from "../../../types/pages/Woomoonkyung/RecommendedStudyPlansPage/EmptyState";


const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className="py-12 text-center">
      <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default EmptyState;
