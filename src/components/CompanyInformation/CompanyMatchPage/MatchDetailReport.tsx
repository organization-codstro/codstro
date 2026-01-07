import ReactMarkdown from "react-markdown";
import { MatchDetailReportProps } from "../../../types/CompanyInformation/CompanyMatchPage/MatchDetailReport";

export function MatchDetailReport({
  reason,
  suggestions,
}: MatchDetailReportProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          매칭 분석 리포트
        </h2>
        <div className="prose-sm prose max-w-none">
          <ReactMarkdown>{reason}</ReactMarkdown>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-200">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">개선 제안</h2>
        <div className="prose-sm prose max-w-none">
          <ReactMarkdown>{suggestions}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
