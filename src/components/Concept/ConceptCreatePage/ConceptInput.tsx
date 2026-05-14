import { ConceptTitleInputProps } from "../../../types/pages/Concept/ConceptCreatePage/ConceptTitleInputProps";

export const ConceptInput = ({
  title,
  value,
  onChange,
}: ConceptTitleInputProps) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {title}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter concept title..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
