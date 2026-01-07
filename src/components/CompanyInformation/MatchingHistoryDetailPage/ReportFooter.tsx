interface ReportFooterProps {
  date: string | Date;
}

export const ReportFooter = ({ date }: ReportFooterProps) => {
  const formattedDate = new Date(date).toLocaleDateString("ko-KR");

  return (
    <div className="p-4 mt-8 border border-gray-200 rounded-lg bg-gray-50">
      <p className="text-sm text-gray-600">
        <span className="font-medium">분석 생성일:</span> {formattedDate}
      </p>
    </div>
  );
};
