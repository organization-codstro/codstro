import React from "react";

interface ProjectHeaderSectionProps {
  title?: string;
  subtitle?: string;
}

export const ProjectHeaderSection: React.FC<ProjectHeaderSectionProps> = ({
  title = "Create New Project",
  subtitle = "Step 2: Review and edit project details",
}) => {
  return (
    <div className="px-8 py-6 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};
