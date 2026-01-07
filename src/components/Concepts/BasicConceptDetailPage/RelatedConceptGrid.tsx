import { useNavigate } from "react-router-dom";
import { RelatedConceptGridProps } from "../../../types/Concepts/BasicConceptDetailPage/RelatedConceptGrid";

export default function RelatedConceptGrid({
  relatedConcepts,
}: RelatedConceptGridProps) {
  const navigate = useNavigate();

  if (!relatedConcepts || relatedConcepts.length === 0) return null;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Related Concepts</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {relatedConcepts.map((related) => (
          <button
            key={related.id}
            className="w-full p-4 text-left transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => navigate(`/basic-concepts/${related.id}`)}
          >
            <h3 className="mb-1 font-semibold text-gray-900">{related.name}</h3>
            <p className="text-xs text-gray-500 capitalize">{related.type}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
