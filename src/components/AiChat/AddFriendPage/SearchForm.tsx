import { Search } from "lucide-react";

interface SearchFormProps {
  form: any;
  setForm: (form: any) => void;
  onSearch: () => void;
}

export function SearchForm({ form, setForm, onSearch }: SearchFormProps) {
  return (
    <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Search AI Friends
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Personality
          </label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.personality}
            onChange={(e) => setForm({ ...form, personality: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Gender</label>
          <select
            className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-600">
            Topics / Interests
          </label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={form.topics}
            onChange={(e) => setForm({ ...form, topics: e.target.value })}
          />
        </div>
      </div>
      <button
        onClick={onSearch}
        className="flex items-center justify-center w-full gap-2 py-3 mt-6 font-bold text-white transition-opacity rounded-xl hover:opacity-90"
        style={{ backgroundColor: "#587CF0" }}
      >
        <Search size={20} />
        Find My Friend
      </button>
    </div>
  );
}
