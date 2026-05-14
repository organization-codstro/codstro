import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BackButtonProps } from "../../../types/pages/Woomoonkyung/StudyPlanDetailPage/BackButton";

export const BackButton: React.FC<BackButtonProps> = ({ label, to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
    >
      <ArrowRight className="w-4 h-4 rotate-180" />
      {label}
    </button>
  );
};

