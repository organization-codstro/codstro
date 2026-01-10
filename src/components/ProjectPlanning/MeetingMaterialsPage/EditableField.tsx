import { EditableFieldProps } from "../../../types/pages/ProjectPlanning/MeetingMaterialsPage/EditableField";

export const EditableField = ({
  isEditing,
  value,
  onChange,
  label,
  type = "input",
  rows = 3,
  isMono = false,
}: EditableFieldProps) => {
  const commonClasses = isMono ? "font-mono text-sm " : "";

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      {isEditing ? (
        type === "input" ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        ) : (
          <textarea
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${commonClasses} w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400`}
          />
        )
      ) : (
        <div
          className={`${commonClasses} px-4 py-2 rounded-lg bg-gray-50 whitespace-pre-wrap`}
        >
          {isMono ? <pre className="whitespace-pre-wrap">{value}</pre> : value}
        </div>
      )}
    </div>
  );
};
