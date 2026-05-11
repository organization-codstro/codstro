import { HistoryHeaderProps } from "../../../types/pages/CompanyInformation/InterviewHistoryPage/HistoryHeader";

const HistoryHeader = ({ title, description }: HistoryHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HistoryHeader;
