import { BookmarkHeaderProps } from "../../../types/pages/CompanyInformation/BookmarksPage/BookmarkHeader";

export function BookmarkHeader({
  title = "관심있는 회사",
  description = "북마크한 회사 목록입니다",
}: BookmarkHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
