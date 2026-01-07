import { NoteTitleInputProps } from "../../../types/Concepts/NoteCreatePage/NoteTitleInput";

export default function NoteTitleInput({
  value,
  onChange,
}: NoteTitleInputProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Note Title
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter note title..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
