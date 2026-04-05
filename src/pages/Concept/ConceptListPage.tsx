import { useNavigate } from "react-router-dom";
import ConceptListHeader from "../../components/Concept/ConceptListPage/ConceptListHeader";
import ConceptSearchBar from "../../components/Concept/ConceptDetailPage/ConceptSearchBar";
import ConceptGrid from "../../components/Concept/ConceptGrid";
import ConceptCard from "../../components/Concept/ConceptListPage/ConceptCard";
import { useEffect, useState } from "react";
import { ConceptListService } from "../../api/Concept/ConceptListPage";
import { ConceptDescriptionMaterial } from "../../types/common/Concepts";

export default function LibrarysListPage() {
  const navigate = useNavigate();
  const [librarys, setlibrarys] = useState<ConceptDescriptionMaterial[]>([]);

  const fetchlibrarys = async () => {
    const response = await ConceptListService.getConcept();
    setlibrarys(response);
  };

  useEffect(() => {
    fetchlibrarys();
  }, []);

  const handleLibraryClick = (id: string) => {
    navigate(`/librarys/${id}`);
  };

  if (!librarys) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="My Concepts"
        description="Explore popular librarys and frameworks"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={(val) => console.log("Library Search:", val)}
        onFilterClick={() => console.log("Library Filter Click")}
      />

      {/* 3. 라이브러리 카드 그리드 리스트 */}
      <ConceptGrid>
        {librarys.map((library) => (
          <ConceptCard
            key={library.id}
            id={library.id}
            name={library.name}
            language={library.includedLanguage}
            description={library.description}
            category={library.category}
            onClick={handleLibraryClick}
          />
        ))}
      </ConceptGrid>
    </div>
  );
}
