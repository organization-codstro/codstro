import { Sparkles } from "lucide-react";

interface Concept {
  id: string;
  name: string;
  type: string;
}

interface ConceptSelectorProps {
  availableConcepts: Concept[];
  selectedConcepts: string[];
  onToggle: (name: string) => void;
  onHide: () => void;
  onGenerateAI: () => void;
}

export default function ConceptSelector({
  availableConcepts,
  selectedConcepts,
  onToggle,
  onHide,
  onGenerateAI,
}: ConceptSelectorProps) {
  return (
    <div className="p-4 mb-6 rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Concepts to Include
        </label>
        <button
          onClick={onHide}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Hide
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 md:grid-cols-4">
        {availableConcepts.map((concept) => (
          <button
            key={concept.id}
            onClick={() => onToggle(concept.name)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedConcepts.includes(concept.name)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-sm font-semibold">{concept.name}</div>
            <div className="text-xs text-gray-500 capitalize">
              {concept.type}
            </div>
          </button>
        ))}
      </div>

      {selectedConcepts.length > 0 && (
        <button
          onClick={onGenerateAI}
          className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Sparkles className="w-4 h-4" />
          Generate Initial Content with AI
        </button>
      )}
    </div>
  );
}
