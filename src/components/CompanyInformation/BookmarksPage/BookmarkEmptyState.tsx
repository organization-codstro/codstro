import { Bookmark as BookmarkIcon } from "lucide-react";

export const BookmarkEmptyState = () => {
  return (
    <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
      <BookmarkIcon size={48} className="mx-auto mb-4 text-gray-300" />
      <p className="text-lg text-gray-500">아직 북마크한 회사가 없습니다</p>
      <p className="mt-2 text-sm text-gray-400">
        관심있는 회사를 북마크하여 나중에 다시 확인해보세요
      </p>
    </div>
  );
};
