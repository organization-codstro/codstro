import { useNavigate } from "react-router-dom";

interface RelatedItem {
  id: string;
  name: string;
  type: string;
}

interface RelatedItemGridProps {
  title?: string;
  items?: RelatedItem[];
  basePath: string; // 이동할 경로의 기본 주소 (예: "/coding-tools" 또는 "/basic-concepts")
}

export default function RelatedItemGrid({
  title = "Related Concepts",
  items,
  basePath,
}: RelatedItemGridProps) {
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full p-4 text-left transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => navigate(`${basePath}/${item.id}`)}
          >
            <h3 className="mb-1 font-semibold text-gray-900">{item.name}</h3>
            <p className="text-xs text-gray-500 capitalize">{item.type}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
