import { useNavigate } from "react-router-dom";
import { packageManagerMaterials } from "../../data/Concepts/PackageListPage/PackageManagerMaterials";
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import MaterialCard from "../../components/Concepts/PackageListPage/MaterialCard";

export default function PackageListPage() {
  const navigate = useNavigate();

  const handleMaterialClick = (id: string) => {
    navigate(`/package-managers/${id}`);
  };

  const handleSearchChange = (value: string) => {
    console.log("Searching for:", value);
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="Package Manager Materials"
        description="Learn about different package managers and library services"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={handleSearchChange}
        onFilterClick={handleFilterClick}
      />

      {/* 3. 자료 카드 그리드 리스트 */}
      <ConceptGrid>
        {packageManagerMaterials.map((material) => (
          <MaterialCard
            key={material.id}
            id={material.id}
            name={material.name}
            description={material.description}
            category={material.category}
            onClick={handleMaterialClick}
          />
        ))}
      </ConceptGrid>
    </div>
  );
}
