import { Star, ExternalLink, Tag } from "lucide-react";
import { RecommendedPin } from "../../types/Woomoonjeong/woomoonjeong";
import { fieldTypeIcons } from "../../constants/fieldTypeIcons";
import { fieldTypeColors } from "../../data/woomoonjeong/woomoonjeongData";

interface DocumentCardProps {
  pin: RecommendedPin;
  isSaved: boolean;
  onToggleSave: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  pin,
  isSaved,
  onToggleSave,
}) => {
  const Icon = fieldTypeIcons[pin.field_type];

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="overflow-hidden transition-shadow bg-white border border-purple-100 shadow-sm rounded-xl hover:shadow-md">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                pin.field_type === "web"
                  ? "bg-red-100"
                  : pin.field_type === "app"
                  ? "bg-orange-100"
                  : pin.field_type === "server"
                  ? "bg-yellow-100"
                  : pin.field_type === "game"
                  ? "bg-green-100"
                  : pin.field_type === "security"
                  ? "bg-blue-100"
                  : pin.field_type === "work"
                  ? "bg-indigo-100"
                  : "bg-purple-100"
              }`}
            >
              <Icon className="w-5 h-5 text-gray-600" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800">
                {pin.title}
              </h3>
              <span
                className={`inline-block px-2 py-1 mt-1 text-xs border rounded-full ${
                  fieldTypeColors[pin.field_type]
                }`}
              >
                {pin.field_type}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleSave}
            className={`p-2 rounded-lg transition-colors ${
              isSaved
                ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
            }`}
          ></button>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {pin.description}
        </p>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {pin.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
              >
                <Tag className="w-2 h-2" />
                {tag}
              </span>
            ))}
            {pin.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                +{pin.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(pin.created_at).toLocaleDateString()}
          </span>
          <a
            href={pin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white text-sm rounded-lg hover:bg-[#4a6de8]"
          >
            <ExternalLink className="w-3 h-3" />
            Visit
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
