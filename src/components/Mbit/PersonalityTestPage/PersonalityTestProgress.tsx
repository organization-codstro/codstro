import React from "react";

interface PersonalityTestProgressProps {
  current: number;
  total: number;
}

const PersonalityTestProgress: React.FC<PersonalityTestProgressProps> = ({
  current,
  total,
}) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="bg-gradient-to-r from-[#587CF0] to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Question {current + 1} of {total}
      </p>
    </div>
  );
};

export default PersonalityTestProgress;
