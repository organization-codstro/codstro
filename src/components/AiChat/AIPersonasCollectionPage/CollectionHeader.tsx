import { ArrowLeft, Plus } from "lucide-react";
import { CollectionHeaderProps } from "../../../types/pages/AiChat/AIPersonasCollectionPage/CollectionHeader";

export const CollectionHeader = ({
  title = "Friend Collection",
  description = "Discover AI friends to chat with",
  onBack,
  onCreate,
}: CollectionHeaderProps) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-opacity bg-blue-600 rounded-lg hover:opacity-90"
          >
            <Plus size={16} />
            만들기
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
