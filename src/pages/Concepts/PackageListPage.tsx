import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { PackageManagerListService } from "../../api/Concepts/PackageListPage";


// 컴포넌트
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import MaterialCard from "../../components/Concepts/PackageListPage/MaterialCard";
import { PackageManagerSummary } from "../../types/common/concepts";

export default function PackageListPage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [materials, setMaterials] = useState<PackageManagerSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const data = await PackageManagerListService.getMaterials();
        setMaterials(data);
      } catch (error) {
        toast.error("자료 목록을 불러오는 데 실패했습니다.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // 3. 검색 로직 (Debounce 500ms)
  useEffect(() => {
    // 최초 렌더링 시에는 실행하지 않음
    if (isLoading && materials.length === 0) return;

    const delayDebounceFn = setTimeout(async () => {
      try {
        let results;
        if (searchTerm.trim() === "") {
          results = await PackageManagerListService.getMaterials();
        } else {
          results = await PackageManagerListService.searchMaterials(searchTerm);
        }
        setMaterials(results);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 4. 핸들러 함수들
  const handleMaterialClick = (id: string) => {
    navigate(`/package-managers/${id}`);
  };

  const handleFilterClick = () => {
    // 필터 기능은 추후 카테고리 선택 모달이나 드롭다운 연동 시
    // PackageManagerListService.filterByCategory 호출로 확장 가능합니다.
    toast.info("Filter feature is coming soon!");
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
        onSearchChange={(val) => setSearchTerm(val)}
        onFilterClick={handleFilterClick}
      />

      {/* 3. 자료 카드 그리드 리스트 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="mt-4 font-medium text-gray-500">Loading materials...</p>
        </div>
      ) : (
        <>
          {materials.length > 0 ? (
            <ConceptGrid>
              {materials.map((material) => (
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
          ) : (
            <div className="py-20 text-center text-gray-500">
              No materials found matching your search.
            </div>
          )}
        </>
      )}
    </div>
  );
}
