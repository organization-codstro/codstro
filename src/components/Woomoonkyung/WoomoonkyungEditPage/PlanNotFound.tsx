import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { PlanNotFoundProps } from "../../../types/Woomoonkyung/WoomoonkyungEditPage/PlanNotFound";

const PlanNotFound: React.FC<PlanNotFoundProps> = ({
  message = "Study plan not found",
  backToPath = "/woomoonkyung",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="p-4 mb-4 rounded-full bg-red-50">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-800">{message}</h2>
      <p className="mb-6 text-gray-600">
        요청하신 플랜을 찾을 수 없거나 삭제되었을 수 있습니다.
      </p>
      <button
        onClick={() => navigate(backToPath)}
        className="flex items-center gap-2 px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to list
      </button>
    </div>
  );
};

export default PlanNotFound;
