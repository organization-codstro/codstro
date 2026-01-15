import { ExternalLink } from "lucide-react";
import { CompanyInfoSectionProps } from "../../../types/pages/CompanyInformation/CompanyDetailPage/CompanyInfoSection";

export function CompanyInfoSection({
  description,
  values,
  website,
  createdDate,
  updatedDate,
}: CompanyInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">회사 소개</h3>
        <p className="leading-relaxed text-gray-700">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            핵심 가치
          </h3>
          <p className="text-gray-700">{values}</p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">웹사이트</h3>
          <a
            href={website ? website : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
            style={{ color: "#587CF0" }}
          >
            <ExternalLink size={18} />
            <span className="truncate">{website || "등록된 웹사이트가 없습니다"}</span>
          </a>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          등록일: {new Date(createdDate).toLocaleDateString("ko-KR")} | 수정일:{" "}
          {new Date(updatedDate).toLocaleDateString("ko-KR")}
        </p>
      </div>
    </div>
  );
}
