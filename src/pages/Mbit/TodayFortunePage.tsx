import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { fortunes } from "../../data/Mbit/fortuneData";

const TodayFortune: React.FC = () => {
  const [currentFortune, setCurrentFortune] = useState<
    (typeof fortunes)[0] | null
  >(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawFortune = () => {
    setIsDrawing(true);
    setTimeout(() => {
      const randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
      setCurrentFortune(randomFortune);
      setIsDrawing(false);
    }, 1000);
  };

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        {!currentFortune ? (
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
              onClick={drawFortune}
              disabled={isDrawing}
              className={`px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105 ${
                isDrawing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isDrawing ? "Drawing..." : "Draw Fortune"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div
              className={`bg-gradient-to-br ${currentFortune.color} rounded-2xl p-12 shadow-xl text-white`}
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-6 bg-white rounded-full bg-opacity-20">
                  <span className="text-6xl font-bold">
                    {currentFortune.code}
                  </span>
                </div>
                <h2 className="mb-2 text-4xl font-bold">
                  {currentFortune.name}
                </h2>
                <p className="mb-6 text-2xl font-semibold">
                  {currentFortune.summary}
                </p>
                <div className="p-6 text-left bg-white bg-opacity-10 rounded-xl">
                  <p className="mb-6 text-lg leading-relaxed">
                    {currentFortune.description}
                  </p>
                  <div className="space-y-3 text-base">
                    {currentFortune.categoryMessage
                      .split("\n")
                      .map((line, index) => {
                        const parts = line.split(":");
                        if (parts.length === 2) {
                          return (
                            <div key={index}>
                              <span className="font-bold">{parts[0]}:</span>
                              <span>{parts[1]}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-xl">
              <button
                onClick={drawFortune}
                disabled={isDrawing}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <RefreshCw
                  className={`h-5 w-5 ${isDrawing ? "animate-spin" : ""}`}
                />
                Draw Again Tomorrow
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayFortune;
