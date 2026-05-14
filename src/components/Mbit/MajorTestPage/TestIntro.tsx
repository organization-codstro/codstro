import React from "react";
import { GraduationCap } from "lucide-react";
import { TestIntroProps } from "../../../types/pages/Mbit/MajorTestPage/TestIntro";

export const TestIntro: React.FC<TestIntroProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-12 bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Major Recommendation Test
        </h2>

        <div className="mb-8 space-y-6">
          <div className="p-6 rounded-lg bg-green-50">
            <h3 className="mb-3 font-bold text-gray-800">
              What This Test Does
            </h3>
            <p className="leading-relaxed text-gray-700">
              Find the perfect tech major that matches your interests,
              strengths, and career aspirations.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-teal-50">
            <h3 className="mb-3 font-bold text-gray-800">What We Focus On</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Your core interests",
                "Project types",
                "Preferred tools",
                "Career paths",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#587CF0] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};
