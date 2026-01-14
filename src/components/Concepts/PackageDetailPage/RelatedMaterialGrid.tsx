import { useNavigate } from "react-router-dom";
import { packageManagerMaterials } from "../../../data/Concepts/PackageListPage/PackageManagerMaterials";

interface RelatedMaterialGridProps {
  relatedMaterials: string[];
}

export default function RelatedMaterialGrid({
  relatedMaterials,
}: RelatedMaterialGridProps) {
  const navigate = useNavigate();

  const relatedItems = packageManagerMaterials.filter((m) =>
    relatedMaterials.includes(m.id)
  );

  if (relatedItems.length === 0) return null;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Related Materials
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {relatedItems.map((material) => (
          <button
            key={material.id}
            className="w-full p-4 text-left transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => navigate(`/package-managers/${material.id}`)}
          >
            <h3 className="mb-1 font-semibold text-gray-900">
              {material.name}
            </h3>
            <p className="text-xs text-gray-500">Material</p>
          </button>
        ))}
      </div>
    </div>
  );
}
