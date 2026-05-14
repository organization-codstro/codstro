import { MatchInfoFooterProps } from "../../../types/pages/CompanyInformation/CompanyMatchPage/MatchInfoFooter";

export const MatchInfoFooter = ({ created_at }: MatchInfoFooterProps) => {
  return (
    <div className="p-4 mt-8 border border-gray-200 rounded-lg bg-gray-50">
      <p className="text-sm text-gray-600">
        <span className="font-medium">분석 생성일:</span>{" "}
        {new Date(created_at).toLocaleDateString("ko-KR")}
      </p>
      <p className="mt-2 text-xs text-gray-500">
        이 분석은 AI가 현재 유저 정보와 회사 정보를 종합적으로 비교하여 생성한
        결과입니다.
      </p>
    </div>
  );
};
