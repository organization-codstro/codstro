import { Building2, Bookmark, ArrowLeft } from "lucide-react";
import { CompanyDetailHeaderProps } from "../../../types/pages/CompanyInformation/CompanyDetailPage/CompanyDetailHeader";

export const CompanyDetailHeader = ({
  name,
  industry,
  isBookmarked,
  onBack,
  onBookmarkToggle,
}: CompanyDetailHeaderProps) => {
  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>목록으로 돌아가기</span>
      </button>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-xl"
            style={{ backgroundColor: "#F0F4FF" }}
          >
            <Building2 size={32} style={{ color: "#587CF0" }} />
          </div>
          <div>
            <h1 className="mb-1 text-3xl font-bold text-gray-900">{name}</h1>
            <p className="text-gray-600">{industry}</p>
          </div>
        </div>

        <button
          onClick={onBookmarkToggle}
          className={`p-3 rounded-lg transition-colors ${
            isBookmarked
              ? "bg-yellow-50 text-yellow-500 hover:bg-yellow-100"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          <Bookmark size={24} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>
    </>
  );
};
