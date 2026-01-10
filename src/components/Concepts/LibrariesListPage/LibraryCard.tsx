import { LibraryCardProps } from "../../../types/pages/Concepts/LibrariesListPage/LibraryCard";

export default function LibraryCard({
  id,
  name,
  language,
  description,
  category,
  tags,
  onClick,
}: LibraryCardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className="p-6 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg hover:border-blue-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded">
          {language}
        </span>
      </div>
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
      <div className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase">
        {category}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs text-blue-600 rounded-full bg-blue-50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
