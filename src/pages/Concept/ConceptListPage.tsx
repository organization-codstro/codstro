import { useNavigate } from "react-router-dom";
import ConceptListHeader from "../../components/Concept/ConceptListPage/ConceptListHeader";
import ConceptSearchBar from "../../components/Concept/ConceptDetailPage/ConceptSearchBar";
import ConceptGrid from "../../components/Concept/ConceptGrid";
import ConceptCard from "../../components/Concept/ConceptListPage/ConceptCard";
import { useEffect, useState } from "react";
import { ConceptListService } from "../../api/Concept/ConceptListPage";
import { ConceptDescriptionMaterial } from "../../types/common/Concepts";

export default function ConceptsListPage() {
  const navigate = useNavigate();
  const [concepts, setConcepts] = useState<ConceptDescriptionMaterial[]>([]);

  const fetchConcepts = async () => {
    const response = await ConceptListService.getConcept();
    setConcepts(response);
  };

  useEffect(() => {
    fetchConcepts();
  }, []);

  const handleConceptClick = (id: string) => {
    navigate(`/concepts/${id}`);
  };

  if (!concepts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="My Concepts"
        description="Explore popular concepts and frameworks"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={(val) => console.log("Concept Search:", val)}
        onFilterClick={() => console.log("Concept Filter Click")}
      />

      {/* 3. 컨셉 카드 그리드 리스트 */}
      <ConceptGrid>
        {concepts.map((concept) => (
          <ConceptCard
            key={concept.id}
            id={concept.id}
            name={concept.name}
            language={concept.includedLanguage}
            description={concept.description}
            category={concept.category}
            onClick={handleConceptClick}
          />
        ))}
      </ConceptGrid>
    </div>
  );
}
