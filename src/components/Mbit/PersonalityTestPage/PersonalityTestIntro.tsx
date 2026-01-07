import React from "react";
import { Users } from "lucide-react";

interface PersonalityTestIntroProps {
  onStart: () => void;
}

const PersonalityTestIntro: React.FC<PersonalityTestIntroProps> = ({
  onStart,
}) => {
  return (
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
              Discover your unique developer personality type through your
              coding style and problem-solving approach.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-purple-50">
            <h3 className="mb-3 font-bold text-gray-800">What We Focus On</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Planning and execution",
                "Debugging approach",
                "Work environment",
                "Learning style",
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

export default PersonalityTestIntro;
