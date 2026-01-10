import { ProjectInputFieldProps } from "../../../types/pages/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInputField";


export const ProjectInputField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  description,
  required = false,
  error = false,
  errorMessage,
  type = "text",
  rows = 4,
}: ProjectInputFieldProps) => {
  const baseClass = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
    error
      ? "border-red-500 focus:ring-red-200"
      : "border-gray-300 focus:ring-blue-500"
  }`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "text" ? (
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      ) : (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={baseClass}
        />
      )}

      {error && errorMessage ? (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      ) : (
        description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )
      )}
    </div>
  );
};
