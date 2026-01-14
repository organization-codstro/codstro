import React from "react";
import { RefreshCw } from "lucide-react";
import { FortuneActionButtonsProps } from "../../../types/pages/Mbit/TodayFortunePage/FortuneActionButtons";

const FortuneActionButtons: React.FC<FortuneActionButtonsProps> = ({
  onDraw,
  isDrawing,
}) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <button
        onClick={onDraw}
        disabled={isDrawing}
        className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        <RefreshCw className={`h-5 w-5 ${isDrawing ? "animate-spin" : ""}`} />
        Draw Again Tomorrow
      </button>
    </div>
  );
};

export default FortuneActionButtons;
