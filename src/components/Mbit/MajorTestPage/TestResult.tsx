import React from "react";
import { GraduationCap } from "lucide-react";
import { TestResultProps } from "../../../types/pages/Mbit/MajorTestPage/TestResult";
const TestResult: React.FC<TestResultProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
        {/* DB에서 가져온 컬러값이 있다면 배경색으로 활용 가능 */}
        <div
          className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full shadow-inner"
          style={{
            background: "linear-gradient(to bottom right, #10b981, #14b8a6)",
          }}
        >
          <GraduationCap className="w-12 h-12 text-white" />
        </div>

        <h2 className="mb-2 text-xl font-medium tracking-widest text-gray-500 uppercase">
          Recommended Major
        </h2>

        {/* 학과 이름 */}
        <div className="text-5xl font-extrabold text-[#587CF0] mb-6">
          {result.major_name}
        </div>

        {/* 학과 상세 설명 (DB 데이터 활용) */}
        <p className="mb-8 text-lg leading-relaxed text-gray-600">
          {result.major_description ||
            `Based on your interests, ${result.major_name} development seems like a great fit!`}
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onReset}
            className="px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            Take Test Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
