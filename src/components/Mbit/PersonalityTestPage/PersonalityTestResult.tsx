import React from "react";
import { Users, RotateCcw } from "lucide-react";
import { PersonalityTestResultProps } from "../../../types/pages/Mbit/PersonalityTestPage/PersonalityTestResult";
import { AXIS_LABELS } from "../../../constants/Mbit/Mbit";

export const PersonalityTestResult: React.FC<PersonalityTestResultProps> = ({
  result,
  axisResults,
  onReset,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 타입 카드 */}
      <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
          <Users className="w-12 h-12 text-white" />
        </div>
        <p className="mb-2 text-sm font-medium tracking-widest text-gray-400 uppercase">
          Your MBIT Type
        </p>
        <div className="text-6xl font-bold text-[#587CF0] mb-3">
          {result.code}
        </div>
        <h2 className="mb-8 text-2xl font-bold text-gray-800">{result.name}</h2>
      </div>

      {/* 축별 비율 카드 */}
      {axisResults.length > 0 && (
        <div className="p-8 bg-white shadow-xl rounded-2xl">
          <h3 className="mb-6 text-lg font-bold text-gray-800">
            축별 성향 분석
          </h3>
          <div className="space-y-6">
            {axisResults.map((axis) => {
              const labelKey = axis.axis;
              const label = AXIS_LABELS[labelKey];
              const [codeA, codeB] = axis.axis.split("/");
              const aScore =
                axis.winner === codeA ? axis.winnerScore : axis.loserScore;
              const bScore =
                axis.winner === codeB ? axis.winnerScore : axis.loserScore;
              const total = aScore + bScore;
              const aRatio =
                total > 0 ? Math.round((aScore / total) * 100) : 50;
              const bRatio = 100 - aRatio;

              return (
                <div key={axis.axis}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      {label?.name ?? axis.axis}
                    </span>
                    <span className="text-sm font-bold text-[#587CF0]">
                      {axis.winner} 우세
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-sm font-semibold text-right text-gray-700">
                      {codeA} {aRatio}%
                    </span>
                    <div className="flex flex-1 h-3 overflow-hidden bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-[#587CF0] transition-all duration-700"
                        style={{ width: `${aRatio}%` }}
                      />
                      <div
                        className="h-full transition-all duration-700 bg-purple-300"
                        style={{ width: `${bRatio}%` }}
                      />
                    </div>
                    <span className="w-20 text-sm font-semibold text-gray-700">
                      {codeB} {bRatio}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 다시하기 버튼 */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#587CF0] to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          다시 검사하기
        </button>
      </div>
    </div>
  );
};
