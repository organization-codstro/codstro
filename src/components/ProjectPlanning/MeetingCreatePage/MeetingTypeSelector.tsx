import { MEETING_TYPES } from "../../../constants/ProjectPlanning/ProjectPlanning";
import { MeetingTypeSelectorProps } from "../../../types/pages/ProjectPlanning/MeetingCreatePage/MeetingTypeSelector";

export const MeetingTypeSelector = ({
  selectedType,
  onSelect,
}: MeetingTypeSelectorProps) => {
  return (
    <div>
      <p className="block mb-3 text-sm font-medium text-gray-700">
        Meeting Type
      </p>

      <div className="grid grid-cols-2 gap-4">
        {MEETING_TYPES.map((type) => (
          <button
            type="button"
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`p-6 border-2 rounded-lg transition-all ${
              selectedType === type.id
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <type.icon
              className={`w-8 h-8 mx-auto mb-3 ${
                selectedType === type.id ? "text-blue-600" : "text-gray-400"
              }`}
            />

            <h3 className="mb-1 font-semibold text-gray-900">{type.title}</h3>

            <p className="text-sm text-gray-600">{type.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
