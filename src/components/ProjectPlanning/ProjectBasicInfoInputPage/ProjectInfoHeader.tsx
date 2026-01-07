import { ProjectInfoHeaderProps } from "../../../types/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInfoHeader";

export const ProjectInfoHeader = ({ isEditMode }: ProjectInfoHeaderProps) => {
  return (
    <div className="px-8 py-6 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? "Edit Project" : "Create New Project"}
        </h1>
        <p className="mt-1 text-gray-600">
          {isEditMode
            ? "Edit basic information about your project"
            : "Step 1: Enter basic information about your project"}
        </p>
      </div>
    </div>
  );
};
