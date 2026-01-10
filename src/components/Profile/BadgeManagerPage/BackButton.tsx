import { ArrowLeft } from "lucide-react";
import { BackButtonProps } from "../../../types/pages/Profile/BadgeManagerPage/BackButton";

export default function BackButton({
  onClick,
  label = "Back",
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mb-6 font-medium text-gray-600 transition-colors hover:text-gray-900"
    >
      <ArrowLeft className="w-5 h-5" />
      {label}
    </button>
  );
}
