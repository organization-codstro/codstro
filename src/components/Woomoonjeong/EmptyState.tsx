import React from "react";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
}) => {
  return (
    <div className="p-12 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
      <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-gray-800">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};
