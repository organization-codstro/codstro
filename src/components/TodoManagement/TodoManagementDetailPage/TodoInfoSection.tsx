import React from "react";
import { TodoInfoSectionProps } from "../../../types/pages/TodoManagement/TodoManagementDetailPage/TodoInfoSection";

export const TodoInfoSection: React.FC<TodoInfoSectionProps> = ({
  label,
  children,
  className = "",
}) => (
  <div className={className}>
    <h3 className="mb-2 font-semibold text-gray-800">{label}</h3>
    <div className="text-gray-600">{children}</div>
  </div>
);
