import { TechStackInfoDisplayProps } from "../../../types/pages/StudyPlan/StudyPlanCreateNodePage/TechStackInfoDisplay";

export const TechStackInfoDisplay = ({ node }: TechStackInfoDisplayProps) => (
  <div className="p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 p-2 bg-white rounded-lg shadow-sm">
        <img
          src={node.tech_stack_img_url}
          alt={node.tech_stack_name}
          className="object-contain w-full h-full"
        />
      </div>
      <div>
        <p className="mb-1 text-xs text-gray-500">기반 Tech Stack</p>
        <p className="font-semibold text-gray-800">{node.tech_stack_name}</p>
      </div>
    </div>
  </div>
);
