import React from "react";
import { Users } from "lucide-react";

interface PersonalityTestResultProps {
  result: string;
  onReset: () => void;
}

const PersonalityTestResult: React.FC<PersonalityTestResultProps> = ({
  result,
  onReset,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
          <Users className="w-12 h-12 text-white" />
        </div>
        <h2 className="mb-4 text-4xl font-bold text-gray-800">
          Your MBIT Type
        </h2>
        <div className="text-6xl font-bold text-[#587CF0] mb-6">{result}</div>
        <p className="mb-8 text-lg text-gray-600">
          You have a unique developer personality! Check the encyclopedia to
          learn more about your type.
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

export default PersonalityTestResult;
