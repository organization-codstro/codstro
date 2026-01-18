import { useNavigate } from "react-router-dom";
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import LibraryCard from "../../components/Concepts/LibrariesListPage/LibraryCard";
import { useEffect, useState } from "react";
import { LibraryDescriptionMaterial } from "../../types/pages/Concepts/concepts";
import { LibraryListService } from "../../api/Concepts/LibrariesListPage";

export default function LibrariesListPage() {
  const navigate = useNavigate();
  const [libraries, setLibraries] = useState<LibraryDescriptionMaterial[]>([]);

  const fetchLibraries = async () => {
    const response = await LibraryListService.getLibraries();
    setLibraries(response);
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  const handleLibraryClick = (id: string) => {
    navigate(`/libraries/${id}`);
  };

  if (!libraries) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="Libraries & Frameworks"
        description="Explore popular libraries and frameworks"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={(val) => console.log("Library Search:", val)}
        onFilterClick={() => console.log("Library Filter Click")}
      />

      {/* 3. 라이브러리 카드 그리드 리스트 */}
      <ConceptGrid>
        {libraries.map((library) => (
          <LibraryCard
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
