import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FieldCardProps } from "../../../types/pages/Woomoonjeong/RecommendedDocumentsMainPage/FieldCard";

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  isSaved,
  onToggleSave,
  onAdd,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // 버튼 클릭 시에는 카드 클릭 이벤트가 발생하지 않도록
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a")
    ) {
      return;
    }
    navigate(`/woomoonjeong/fields/${field.field_id}`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (
        !(e.target as HTMLElement).closest("button") &&
        !(e.target as HTMLElement).closest("a")
      ) {
        navigate(`/woomoonjeong/fields/${field.field_id}`);
      }
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAdd) {
      onAdd();
    }
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
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{field.field_name}</h3>
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
        <p className="mb-4 text-sm text-gray-600">{field.field_description}</p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(field.field_created_at).toLocaleDateString()}
          </span>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors rounded-lg bg-[#587CF0] hover:bg-[#4a6de8]"
          >
            <ExternalLink className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
