import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackButtonProps } from "../../types/pages/Concepts/BackButton";

export default function BackButton({
  to,
  label = "Back to Concepts",
}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
    >
      <ArrowLeft className="w-5 h-5" />
      {label}
    </button>
  );
}
