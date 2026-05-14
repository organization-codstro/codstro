import React from "react";
import { BookOpen } from "lucide-react";
import { StudyPlanNodeEmptyStateProps } from "../../../../types/pages/Woomoonkyung/StudyPlanArchiveDetailPage/MyNodeList/StudyPlanNodeEmptyState";

export const StudyPlanNodeEmptyState: React.FC<
  StudyPlanNodeEmptyStateProps
> = ({ title, description }) => {
  return (
    <div className="py-12 text-center">
      <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
