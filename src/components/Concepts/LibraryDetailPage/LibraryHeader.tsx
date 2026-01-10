import { ExternalLink } from "lucide-react";
import { LibraryHeaderProps } from "../../../types/pages/Concepts/LibraryDetailPage/LibraryHeader";

export default function LibraryHeader({
  name,
  language,
  description,
  tags,
  officialSite,
}: LibraryHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
          {language}
        </span>
      </div>

      <p className="mb-4 text-gray-600">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm text-blue-600 rounded-full bg-blue-50"
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
        Official Documentation
      </a>
    </div>
  );
}
