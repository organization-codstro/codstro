import React from "react";
import { GraduationCap } from "lucide-react";

interface TestResultProps {
  result: string;
  onReset: () => void;
}

const TestResult: React.FC<TestResultProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        <h2 className="mb-4 text-4xl font-bold text-gray-800">
          Recommended Major
        </h2>
        <div className="text-5xl font-bold text-[#587CF0] mb-6">{result}</div>
        <p className="mb-8 text-lg text-gray-600">
          Based on your interests and preferences, {result} development seems
          like a great fit!
        </p>
        <button
          onClick={onReset}
          className="px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          Take Test Again
        </button>
      </div>
    </div>
  );
};

export default TestResult;
