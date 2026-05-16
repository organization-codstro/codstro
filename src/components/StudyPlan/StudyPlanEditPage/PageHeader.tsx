import React from "react";
import { PageHeaderProps } from "../../../types/pages/StudyPlan/StudyPlanEditPage/PageHeader";

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-lg text-gray-600">{description}</p>
      )}
    </div>
  );
};
