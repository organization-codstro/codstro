import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// 서비스 및 타입
import { BasicConceptsListService } from "../../api/Concepts/BasicConceptsListPage";
import { ConceptSummaryResponse } from "../../types/api/Concepts/BasicConceptsListPage";

// 컴포넌트
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import ConceptCard from "../../components/Concepts/BasicConceptsListPage/ConceptCard";

export default function BasicConceptsListPage() {
  const navigate = useNavigate();

  // 1. 상태 관리 (Core Principle: useState)
  const [concepts, setConcepts] = useState<ConceptSummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 초기 데이터 로드 (Core Principle: useEffect)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const data = await BasicConceptsListService.getConcepts();
        setConcepts(data);
      } catch (err: any) {
        setError(err.message);
        toast.error("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // 3. 검색 로직 (Core Principle: Debounce 적용)
  useEffect(() => {
    // 검색어가 없을 때는 초기화하지 않고 초기 로딩과 겹치지 않게 처리
    if (searchTerm === "" && !isLoading && concepts.length === 0) {
      BasicConceptsListService.getConcepts().then(setConcepts);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        try {
          const filteredData = await BasicConceptsListService.searchConcepts({
            keyword: searchTerm,
          });
          setConcepts(filteredData);
        } catch (err) {
          toast.error("검색 중 오류가 발생했습니다.");
        }
      } else {
        // 검색어가 비워지면 전체 리스트 재호출
        const data = await BasicConceptsListService.getConcepts();
        setConcepts(data);
      }
    }, 500); // 500ms 디바운스

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 상세 페이지 이동 핸들러
  const handleConceptClick = (id: string) => {
    navigate(`/basic-concepts/${id}`);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // 필터 버튼 클릭 핸들러 (추후 카테고리 선택 모달 연동 가능)
  const handleFilterClick = () => {
    toast.info("카테고리 필터 기능은 준비 중입니다.");
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

      {/* 3. 로딩 및 결과 처리 (Core Principle: UX) */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-500">
          개념 정보를 불러오는 중...
        </div>
      ) : concepts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          검색 결과가 없습니다.
        </div>
      ) : (
        <ConceptGrid>
          {concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              id={concept.id}
              name={concept.name}
              description={concept.description}
              category={concept.category}
              onClick={handleConceptClick}
            />
          ))}
        </ConceptGrid>
      )}
    </div>
  );
}
