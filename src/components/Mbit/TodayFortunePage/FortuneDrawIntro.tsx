import React from "react";
import { FortuneDrawIntroProps } from "../../../types/pages/Mbit/TodayFortunePage/FortuneDrawIntro";

const FortuneDrawIntro: React.FC<FortuneDrawIntroProps> = ({
  onDraw,
  isDrawing,
}) => {
  return (
    <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
      <div className="flex items-center justify-center w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
        <span className="text-6xl font-bold text-white">?</span>
      </div>
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        Ready to discover your fortune?
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        Let's see what HTTP status code awaits you today
      </p>
      <button
        onClick={onDraw}
        disabled={isDrawing}
        className={`px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105 ${
          isDrawing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isDrawing ? "Drawing..." : "Draw Fortune"}
      </button>
    </div>
  );
};

export default FortuneDrawIntro;
