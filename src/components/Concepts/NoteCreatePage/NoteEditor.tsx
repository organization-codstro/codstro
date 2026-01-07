interface NoteEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function NoteEditor({ value, onChange }: NoteEditorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <span className="text-xs text-gray-500">Markdown supported</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your notes in markdown format..."
        className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg h-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
