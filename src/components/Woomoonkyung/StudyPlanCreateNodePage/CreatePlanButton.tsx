import { CreatePlanButtonProps } from "../../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/CreatePlanButton";

export const CreatePlanButton = ({
  onClick,
  nodeCount,
  disabled,
}: CreatePlanButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
      disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-[#587CF0] hover:bg-[#4a6de8] shadow-md hover:shadow-lg transform hover:scale-[1.02]"
    }`}
  >
    공부 계획 생성 ({nodeCount}개 노드)
  </button>
);
