import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
    >
      <ArrowLeft size={20} />
      <span>목록으로 돌아가기</span>
    </button>
  );
};
