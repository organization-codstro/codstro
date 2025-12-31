import React, { useState } from "react";
import { Users, ArrowRight, Check } from "lucide-react";
import { personalityTestQuestionData } from "../../data/Mbit/personalityTestQuestionData";

const PersonalityTest: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < personalityTestQuestionData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const personalityType = newAnswers.join("");
      setResult(personalityType);
    }
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (!started) {
    return (
      <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-3xl mx-auto">
          <div className="p-12 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
              Developer Personality Test
            </h2>

            <div className="mb-8 space-y-6">
              <div className="p-6 rounded-lg bg-blue-50">
                <h3 className="mb-3 font-bold text-gray-800">
                  What This Test Does
                </h3>
                <p className="leading-relaxed text-gray-700">
                  Discover your unique developer personality type through a
                  series of questions about your coding style, work preferences,
                  and problem-solving approach.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-purple-50">
                <h3 className="mb-3 font-bold text-gray-800">
                  What We Focus On
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>Your planning and execution style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>How you approach debugging and problem-solving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>Your preferred work environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>How you learn new technologies</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-pink-50">
                <p className="text-gray-700">
                  <span className="font-semibold">Time required:</span> About 2
                  minutes • <span className="font-semibold">Questions:</span> 4
                </p>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-3xl mx-auto">
          <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-800">
              Your MBIT Type
            </h2>
            <div className="text-6xl font-bold text-[#587CF0] mb-6">
              {result}
            </div>
            <p className="mb-8 text-lg text-gray-600">
              You have a unique developer personality! Check the encyclopedia to
              learn more about your type.
            </p>
            <button
              onClick={resetTest}
              className="px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Take Test Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = personalityTestQuestionData[currentQuestion];
  const progress =
    ((currentQuestion + 1) / personalityTestQuestionData.length) * 100;

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="bg-gradient-to-r from-[#587CF0] to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Question {currentQuestion + 1} of{" "}
            {personalityTestQuestionData.length}
          </p>
        </div>

        <div className="p-12 bg-white shadow-xl rounded-2xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-800">
            {question.question}
          </h2>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.type)}
                className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-[#587CF0] hover:bg-purple-50 transition-all group"
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
    </div>
  );
};

export default PersonalityTest;
