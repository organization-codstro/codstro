import React from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  content: string;
  scale: number[];
  onAnswer: (value: number) => void;
};

const TestQuestion: React.FC<Props> = ({ content, scale, onAnswer }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-12 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">{content}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {scale.map((value, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(value)}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-[#587CF0] hover:bg-green-50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 group-hover:text-[#587CF0]">
                  {value}점 선택
                </span>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#587CF0]" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestQuestion;
