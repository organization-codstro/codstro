import React from "react";

interface ProjectBasicInfoSectionProps {
  projectName: string;
  setProjectName: (v: string) => void;
  projectTopic: string;
  setProjectTopic: (v: string) => void;
  projectDescription: string;
  setProjectDescription: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  mainColor: string;
  setMainColor: (v: string) => void;
  designStyle: string;
  setDesignStyle: (v: string) => void;
  projectEffect: string;
  setProjectEffect: (v: string) => void;
}

export const ProjectBasicInfoSection: React.FC<
  ProjectBasicInfoSectionProps
> = ({
  projectName,
  setProjectName,
  projectTopic,
  setProjectTopic,
  projectDescription,
  setProjectDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  mainColor,
  setMainColor,
  designStyle,
  setDesignStyle,
  projectEffect,
  setProjectEffect,
}) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Basic Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            type="text"
            value={projectTopic}
            onChange={(e) => setProjectTopic(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Main Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Design Style
          </label>
          <input
            type="text"
            value={designStyle}
            onChange={(e) => setDesignStyle(e.target.value)}
            placeholder="Optional"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Project Effects
          </label>
          <input
            type="text"
            value={projectEffect}
            onChange={(e) => setProjectEffect(e.target.value)}
            placeholder="Optional"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>
    </div>
  );
};
