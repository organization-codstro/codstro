import { Star } from "lucide-react";
import { RecommendedField } from "../../types/Woomoonjeong/woomoonjeong";
import { fieldTypeIcons } from "../../constants/fieldTypeIcons";
import { fieldTypeColors } from "../../data/woomoonjeong/woomoonjeongData";

interface FieldCardProps {
  field: RecommendedField;
  isSaved: boolean;
  onToggleSave: () => void;
}

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  isSaved,
  onToggleSave,
}) => {
  const Icon = fieldTypeIcons[field.type];

  const bgColor =
    field.type === "web"
      ? "bg-red-100"
      : field.type === "app"
      ? "bg-orange-100"
      : field.type === "server"
      ? "bg-yellow-100"
      : field.type === "game"
      ? "bg-green-100"
      : field.type === "security"
      ? "bg-blue-100"
      : field.type === "work"
      ? "bg-indigo-100"
      : "bg-purple-100";

  const iconColor =
    field.type === "web"
      ? "text-red-600"
      : field.type === "app"
      ? "text-orange-600"
      : field.type === "server"
      ? "text-yellow-600"
      : field.type === "game"
      ? "text-green-600"
      : field.type === "security"
      ? "text-blue-600"
      : field.type === "work"
      ? "text-indigo-600"
      : "text-purple-600";

  return (
    <div className="overflow-hidden transition-shadow bg-white border border-purple-100 shadow-sm rounded-xl hover:shadow-md">
      {field.image && (
        <div className="h-32 overflow-hidden bg-gray-200">
          <img
            src={field.image}
            alt={field.name}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${bgColor}`}
            >
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{field.name}</h3>
              <span
                className={`inline-block px-2 py-1 mt-1 text-xs border rounded-full ${
                  fieldTypeColors[field.type]
                }`}
              >
                {field.type}
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
        <p className="mb-4 text-sm text-gray-600">{field.description}</p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(field.created_at).toLocaleDateString()}
          </span>

          <button
            onClick={onToggleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors rounded-lg bg-[#587CF0] hover:bg-[#4a6de8]"
          >
            <Star className="w-3 h-3" />
            {isSaved ? "Saved" : "Save Field"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
