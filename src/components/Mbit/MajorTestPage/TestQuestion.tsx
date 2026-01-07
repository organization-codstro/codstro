import React from "react";
import { ArrowRight } from "lucide-react";

interface QuestionOption {
  text: string;
  major: string;
}

interface TestQuestionProps {
  question: string;
  options: QuestionOption[];
  onAnswer: (major: string) => void;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  options,
  onAnswer,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-12 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">{question}</h2>
        <div className="space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option.major)}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-[#587CF0] hover:bg-green-50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 group-hover:text-[#587CF0]">
                  {option.text}
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
