import { CompanyListHeaderProps } from "../../../types/pages/CompanyInformation/CompanyListPage/CompanyListHeader";

export function CompanyListHeader({
  title = "회사 정보",
  description = "관심있는 회사를 찾아보세요",
}: CompanyListHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
