import React, { useState } from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { majorTestQuestions } from "../../data/Mbit/majorTestQuestionData";

const MajorTest: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [majorScores, setMajorScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (major: string) => {
    const newScores = { ...majorScores };
    newScores[major] = (newScores[major] || 0) + 1;
    setMajorScores(newScores);

    if (currentQuestion < majorTestQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const topMajor = Object.entries(newScores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      setResult(topMajor);
    }
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setMajorScores({});
    setResult(null);
  };

  if (!started) {
    return (
      <div className="flex-1 p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
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
                  strengths, and career aspirations. Get personalized
                  recommendations based on what you enjoy most.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-teal-50">
                <h3 className="mb-3 font-bold text-gray-800">
                  What We Focus On
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>Your core interests and passions in tech</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>What types of projects excite you most</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>Your preferred tools and technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#587CF0] mt-1">•</span>
                    <span>Career paths that align with your goals</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-blue-50">
                <p className="text-gray-700">
                  <span className="font-semibold">Time required:</span> About 1
                  minute • <span className="font-semibold">Questions:</span> 3
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
      <div className="flex-1 p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
        <div className="max-w-3xl mx-auto">
          <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-800">
              Recommended Major
            </h2>
            <div className="text-5xl font-bold text-[#587CF0] mb-6">
              {result}
            </div>
            <p className="mb-8 text-lg text-gray-600">
              Based on your interests and preferences, {result} development
              seems like a great fit for you!
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

  const question = majorTestQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / majorTestQuestions.length) * 100;

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 transition-all rounded-full bg-gradient-to-r from-green-500 to-teal-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Question {currentQuestion + 1} of {majorTestQuestions.length}
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
                onClick={() => handleAnswer(option.major)}
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
    </div>
  );
};

export default MajorTest;
