import { CheckCircle, MessageSquare } from "lucide-react";
import { MeetingTypeSelectorProps } from "../../../types/pages/ProjectPlanning/MeetingCreatePage/MeetingTypeSelector";

export const MeetingTypeSelector = ({ selectedType, onSelect }: MeetingTypeSelectorProps) => {
  const types = [
    {
      id: "Feature",
      title: "Feature Meeting",
      desc: "Discuss specific project pages and features",
      icon: CheckCircle,
    },
    {
      id: "Free",
      title: "Free Meeting",
      desc: "Open discussion about your project",
      icon: MessageSquare,
    },
  ] as const;

  return (
    <div>
      <label className="block mb-3 text-sm font-medium text-gray-700">
        Meeting Type
      </label>
      <div className="grid grid-cols-2 gap-4">
        {types.map((type) => (
          <button
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
