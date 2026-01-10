import { ExternalLink } from "lucide-react";
import { ThirdPartyHeaderProps } from "../../../types/pages/Concepts/ThirdPartyDetailPage/ThirdPartyHeader";

export default function ThirdPartyHeader({
  name,
  category,
  description,
  tags,
  officialSite,
}: ThirdPartyHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
          {category}
        </span>
      </div>

      <p className="mb-4 text-gray-600">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm text-orange-600 rounded-full bg-orange-50"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={officialSite}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ExternalLink className="w-4 h-4" />
        Official Website
      </a>
    </div>
  );
}
