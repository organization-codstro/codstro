import { LucideIcon } from "lucide-react";

interface FormInputProps {
  label: string;
  value: string;
  type?: string;
  icon: LucideIcon;
  disabled?: boolean;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  value,
  type = "text",
  icon: Icon,
  disabled = false,
  helperText,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0] transition-all ${
            disabled
              ? "text-gray-500 border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 bg-white"
          }`}
        />
      </div>
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
