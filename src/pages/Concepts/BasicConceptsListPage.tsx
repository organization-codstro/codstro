import { useNavigate } from "react-router-dom";
import { concepts } from "../../data/Concepts/concepts";
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import ConceptCard from "../../components/Concepts/BasicConceptsListPage/ConceptCard";

export default function BasicConceptsList() {
  const navigate = useNavigate();

  // 상세 페이지 이동 핸들러
  const handleConceptClick = (id: string) => {
    navigate(`/basic-concepts/${id}`);
  };

  // 검색어 변경 핸들러 (추후 필터링 로직 추가 가능)
  const handleSearchChange = (value: string) => {
    console.log("Searching for:", value);
  };

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="Basic Concepts"
        description="Master fundamental programming concepts"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={handleSearchChange}
        onFilterClick={handleFilterClick}
      />

      {/* 3. 개념 카드 그리드 리스트 */}
      <ConceptGrid>
        {concepts.map((concept) => (
          <ConceptCard
            key={concept.id}
            id={concept.id}
            name={concept.name}
            description={concept.description}
            category={concept.category}
            tags={concept.tags}
            onClick={handleConceptClick}
          />
        ))}
      </ConceptGrid>
    </div>
  );
}
