import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { concepts } from "../../data/Concepts/concepts";

export default function BasicConceptsList() {
  const navigate = useNavigate();

  const handleConceptClick = (id: string) => {
    navigate(`/basic-concepts/${id}`);
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Basic Concepts
        </h1>
        <p className="text-gray-600">Master fundamental programming concepts</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search concepts..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {concepts.map((concept) => (
          <div
            key={concept.id}
            onClick={() => handleConceptClick(concept.id)}
            className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">
                {concept.name}
              </h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">{concept.description}</p>
            <div className="mb-3 text-xs text-gray-500">{concept.category}</div>
            <div className="flex flex-wrap gap-2">
              {concept.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs text-green-600 rounded-full bg-green-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
