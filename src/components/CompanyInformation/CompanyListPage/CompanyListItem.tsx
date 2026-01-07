import { Building2, Bookmark, ExternalLink } from "lucide-react";
import { Company } from "../../../types/CompanyInformation/company";

interface CompanyListItemProps {
  company: Company;
  isBookmarked: boolean;
  onToggleBookmark: (id: number, e: React.MouseEvent) => void;
  onSelect: (id: number) => void;
}

export function CompanyListItem({
  company,
  isBookmarked,
  onToggleBookmark,
  onSelect,
}: CompanyListItemProps) {
  return (
    <div
      className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
      onClick={() => onSelect(company.company_id)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{ backgroundColor: "#F0F4FF" }}
            >
              <Building2 size={24} style={{ color: "#587CF0" }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {company.company_name}
              </h3>
            </div>
          </div>
          <button
            onClick={(e) => onToggleBookmark(company.company_id, e)}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? "text-yellow-500 hover:bg-yellow-50"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">분야</p>
            <p className="text-sm text-gray-700">{company.company_industry}</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">회사 설명</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {company.companie_description}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">핵심 가치</p>
            <p className="text-sm text-gray-700">{company.company_values}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
          <a
            href={company.company_website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm hover:underline"
            style={{ color: "#587CF0" }}
          >
            <ExternalLink size={14} />
            <span>웹사이트</span>
          </a>
          <span className="text-xs text-gray-400">
            {new Date(company.company_update_date).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </div>
  );
}
