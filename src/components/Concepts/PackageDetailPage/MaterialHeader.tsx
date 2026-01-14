import { ExternalLink } from "lucide-react";
import { MaterialHeaderProps } from "../../../types/pages/Concepts/PackageDetailPage/MaterialHeader";

export default function MaterialHeader({
  name,
  category,
  description,
  tags,
  documentUrl,
}: MaterialHeaderProps) {
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
            className="px-3 py-1 text-sm text-blue-600 rounded-full bg-blue-50"
          >
            {tag}
          </span>
        ))}
      </div>

      {documentUrl && (
        <a
          href={documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="w-4 h-4" />
          Official Documentation
        </a>
      )}
    </div>
  );
}
