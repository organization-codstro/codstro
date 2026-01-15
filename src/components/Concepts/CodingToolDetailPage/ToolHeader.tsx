import { CheckCircle } from "lucide-react";
import { ToolHeaderProps } from "../../../types/pages/Concepts/CodingToolDetailPage/ToolHeader";

export default function ToolHeader({
  name,
  category,
  description,
  isUnderstood,
  onToggleUnderstood,
}: ToolHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        </div>
        <p className="mb-4 text-gray-600">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {category.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm text-green-600 rounded-full bg-green-50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={onToggleUnderstood}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isUnderstood
            ? "bg-green-100 text-green-700"
            : "border border-gray-300 hover:bg-gray-50"
        }`}
      >
        <CheckCircle className="w-4 h-4" />
        {isUnderstood ? "Understood" : "Mark as Understood"}
      </button>
    </div>
  );
}
