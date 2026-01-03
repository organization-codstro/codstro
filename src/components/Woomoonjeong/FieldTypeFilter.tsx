import React from "react";
import { BookOpen } from "lucide-react";
import {
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";

const fieldTypeIcons = {
  web: Code,
  app: Smartphone,
  server: Server,
  game: Gamepad2,
  security: Shield,
  work: Briefcase,
  other: HelpCircle,
};

type FieldType =
  | "all"
  | "web"
  | "app"
  | "server"
  | "game"
  | "security"
  | "work"
  | "other";

interface FieldTypeFilterProps {
  selectedFieldType: FieldType;
  onChange: (type: FieldType) => void;
}

const FieldTypeFilter: React.FC<FieldTypeFilterProps> = ({
  selectedFieldType,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Field Type:</span>
      {(
        [
          "all",
          "web",
          "app",
          "server",
          "game",
          "security",
          "work",
          "other",
        ] as const
      ).map((fieldType) => {
        const Icon = fieldType === "all" ? BookOpen : fieldTypeIcons[fieldType];

        return (
          <button
            key={fieldType}
            onClick={() => onChange(fieldType)}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              selectedFieldType === fieldType
                ? "bg-[#587CF0] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Icon className="w-3 h-3" />
            {fieldType}
          </button>
        );
      })}
    </div>
  );
};

export default FieldTypeFilter;
