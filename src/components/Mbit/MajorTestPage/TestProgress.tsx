import React from "react";

interface TestProgressProps {
  current: number;
  total: number;
}

const TestProgress: React.FC<TestProgressProps> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-green-500 to-teal-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Question {current + 1} of {total}
      </p>
    </div>
  );
};

export default TestProgress;
