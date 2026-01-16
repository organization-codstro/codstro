import { ExternalLink, Tag } from "lucide-react";
import { DocumentCardProps } from "../../../types/pages/Woomoonjeong/RecommendedDocumentsMainPage/DocumentCard";

const DocumentCard: React.FC<DocumentCardProps> = ({
  pin,
  isSaved,
  onToggleSave,
  onAdd,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a")
    ) {
      return;
    }
    window.open(pin.pin_url, "_blank", "noopener,noreferrer");
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (
        !(e.target as HTMLElement).closest("button") &&
        !(e.target as HTMLElement).closest("a")
      ) {
        window.open(pin.pin_url, "_blank", "noopener,noreferrer");
      }
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.();
  };

  return (
    <div
      className="overflow-hidden transition-shadow bg-white border border-purple-100 shadow-sm rounded-xl hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#587CF0]"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{pin.pin_title}</h3>
          </div>

          {/* Save */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`p-2 rounded-lg transition-colors ${
              isSaved
                ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
            }`}
            title={isSaved ? "Unsave" : "Save"}
          >
            ★
          </button>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {pin.pin_description}
        </p>

        {/* Tags */}
        {pin.pin_label.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {pin.pin_label.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                >
                  <Tag className="w-2 h-2" />
                  {tag}
                </span>
              ))}
              {pin.pin_label.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                  +{pin.pin_label.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(pin.created_at).toLocaleDateString()}
          </span>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg bg-[#587CF0] hover:bg-[#4a6de8]"
          >
            <ExternalLink className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
