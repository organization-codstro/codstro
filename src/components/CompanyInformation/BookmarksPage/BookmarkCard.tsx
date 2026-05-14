import {
  Building2,
  Bookmark as BookmarkIcon,
  ExternalLink,
} from "lucide-react";
import { BookmarkCardProps } from "../../../types/pages/CompanyInformation/BookmarksPage/BookmarkCard";

export const BookmarkCard = ({
  company,
  onRemove,
  onClick,
}: BookmarkCardProps) => {
  return (
    <article className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      {/* 카드 클릭 영역 — 버튼과 링크 제외한 영역 */}
      <button
        type="button"
        onClick={() => onClick(company.company_id)}
        className="w-full p-6 text-left"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{ backgroundColor: "#F0F4FF" }}
            >
              <Building2 size={24} style={{ color: "#587CF0" }} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {company.company_name}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">분야</p>
            <p className="text-sm text-gray-700">{company.company_industry}</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">회사 설명</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {company.company_description || "등록된 설명이 없습니다"}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">핵심 가치</p>
            <p className="text-sm text-gray-700">
              {company.company_values || "등록된 가치가 없습니다"}
            </p>
          </div>
        </div>
      </button>

      {/* 하단 액션 영역 — 버튼/링크가 있어서 button 바깥으로 분리 */}
      <div className="flex items-center justify-between px-6 pt-4 pb-6 border-t border-gray-100">
        <a
          href={company.company_website ? company.company_website : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm hover:underline"
          style={{ color: "#587CF0" }}
        >
          <ExternalLink size={14} />
          <span>웹사이트</span>
        </a>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {new Date(company.created_at).toLocaleDateString("ko-KR")}
          </span>
          <button
            type="button"
            onClick={(e) => onRemove(company.company_id, e)}
            className="p-2 text-yellow-500 transition-colors rounded-lg hover:bg-yellow-50"
            aria-label={`${company.company_name} 북마크 제거`}
          >
            <BookmarkIcon size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </article>
  );
};
