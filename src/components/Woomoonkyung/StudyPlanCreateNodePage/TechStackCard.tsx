import { TechStackCardProps } from "../../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/TechStackCard";

export const TechStackCard = ({ techStack, onClick }: TechStackCardProps) => (
  <button
    onClick={() => onClick(techStack)}
    className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#587CF0] hover:bg-blue-50 transition-all duration-200 group hover:shadow-md transform hover:scale-105"
  >
    <div className="flex items-center justify-center p-2 mb-3 bg-white rounded-lg aspect-square">
      <img
        src={techStack.tech_stack_img_url}
        alt={techStack.tech_stack_name}
        className="object-contain w-full h-full"
      />
    </div>
    <p className="text-sm font-medium text-gray-800 text-center group-hover:text-[#587CF0] transition-colors">
      {techStack.tech_stack_name}
    </p>
  </button>
);
