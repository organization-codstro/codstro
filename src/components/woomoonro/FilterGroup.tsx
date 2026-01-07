import { FilterGroupProps } from "../../types/Woomoonro/FilterGroup";

export const FilterGroup = ({
  label,
  current,
  options,
  onChange,
}: FilterGroupProps) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-semibold text-gray-700">{label}:</span>
    <div className="flex gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
            current === opt
              ? "bg-[#587CF0] text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {opt.toUpperCase().replace("_", " ")}
        </button>
      ))}
    </div>
  </div>
);
