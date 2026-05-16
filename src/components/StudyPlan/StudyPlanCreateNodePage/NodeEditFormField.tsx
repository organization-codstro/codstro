import { NodeEditFormFieldProps } from "../../../types/pages/StudyPlan/StudyPlanCreateNodePage/NodeEditFormField";

export const NodeEditFormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rows,
  error,
  required = false,
}: NodeEditFormFieldProps) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent resize-none transition-all"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-2 focus:ring-[#587CF0]"
        }`}
      />
    )}
    {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
  </div>
);
