import { ArrowLeft } from "lucide-react";

export type BackButtonProps = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
  >
    <ArrowLeft className="w-4 h-4" />
    공부 계획으로
  </button>
);
