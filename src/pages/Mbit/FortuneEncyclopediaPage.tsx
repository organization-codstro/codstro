import React, { useState } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";
import { fortunes, Fortune } from "../../data/Mbit/fortuneData";

const FortuneEncyclopedia: React.FC = () => {
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);

  if (selectedFortune) {
    return (
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedFortune(null)}
            className="flex items-center gap-2 text-[#587CF0] hover:text-[#4A6EE8] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Encyclopedia</span>
          </button>

          <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className={`${selectedFortune.color} p-8 text-white`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full bg-opacity-20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold">{selectedFortune.code}</h1>
              </div>
              <p className="text-lg text-white text-opacity-90">
                {selectedFortune.name}
              </p>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Summary
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {selectedFortune.summary}
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Description
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {selectedFortune.description}
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Category Message
                </h2>
                <pre className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {selectedFortune.categoryMessage}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Fortune Encyclopedia
          </h1>
          <p className="text-gray-600">
            Learn about all possible fortune levels
          </p>
        </div>

        <div className="grid gap-6">
          {fortunes.map((fortune) => (
            <div
              key={fortune.id}
              onClick={() => setSelectedFortune(fortune)}
              className="p-6 transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 ${fortune.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-gray-800">
                    {fortune.code} - {fortune.name}
                  </h3>
                  <p className="text-gray-600">{fortune.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FortuneEncyclopedia;
