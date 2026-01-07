import { ThirdPartyCardProps } from "../../../types/Concepts/ThirdPartyListPage/ThirdPartyCard";

export default function ThirdPartyCard({
  id,
  name,
  description,
  category,
  tags,
  onClick,
}: ThirdPartyCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="w-full p-6 text-left transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg hover:border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      </div>
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
      <div className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase">
        {category}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs text-orange-600 rounded-full bg-orange-50"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
