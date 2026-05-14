import { useNavigate } from "react-router-dom";
import { ConceptListHeader } from "../../components/Concept/ConceptListPage/ConceptListHeader";
import { ConceptSearchBar } from "../../components/Concept/ConceptDetailPage/ConceptSearchBar";
import { ConceptGrid } from "../../components/Concept/ConceptGrid";
import { ConceptCard } from "../../components/Concept/ConceptListPage/ConceptCard";
import { useEffect, useState } from "react";
import { ConceptListService } from "../../api/Concept/ConceptListPage";
import { ConceptDescriptionMaterial } from "../../types/common/Concepts";

export default function ConceptsListPage() {
  const navigate = useNavigate();
  const [concepts, setConcepts] = useState<ConceptDescriptionMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConcepts = async () => {
    const response = await ConceptListService.getConcept();
    setConcepts(response);
  };

  // 검색 핸들러: 엔터 시 호출
  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      // 검색어 없으면 전체 목록 복원
      fetchConcepts();
      return;
    }

    setIsLoading(true);
    try {
      const result = await ConceptListService.searchConcept({ keyword });
      setConcepts(result);
    } catch (err) {
      console.error("검색 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConcepts();
  }, []);

  // 4. 핸들러
  const handleCreateClick = () => navigate("/concepts/create");
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
        onCreateClick={handleCreateClick}
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar onSearch={handleSearch} />

      {/* 3. 컨셉 카드 그리드 리스트 */}
      <ConceptGrid>
        {concepts.map((concept) => (
          <ConceptCard
            key={concept.id}
            id={concept.id}
            name={concept.name}
            language={concept.includedField}
            description={concept.description}
            category={concept.category}
            onClick={handleConceptClick}
          />
        ))}
      </ConceptGrid>
    </div>
  );
}
