import { ArrowLeft } from "lucide-react";
import { CollectionHeaderProps } from "../../../types/pages/AiChat/AIPersonasCollectionPage/CollectionHeader";

export function CollectionHeader({
  title = "Friend Collection",
  description = "Discover AI friends to chat with",
  onBack,
}: CollectionHeaderProps) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
