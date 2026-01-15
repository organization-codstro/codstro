import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { ThirdPartyListService } from "../../api/Concepts/ThirdPartyListPage";
import { ThirdPartySummaryResponse } from "../../types/api/Concepts/ThirdPartyListPage";

// 컴포넌트
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import ThirdPartyCard from "../../components/Concepts/ThirdPartyListPage/ThirdPartyCard";

export default function ThirdPartyListPage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [services, setServices] = useState<ThirdPartySummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 초기 데이터 페칭
  useEffect(() => {
    const fetchInitialServices = async () => {
      try {
        setIsLoading(true);
        const data = await ThirdPartyListService.getServices();
        setServices(data);
      } catch (error) {
        console.error(error);
        toast.error("서비스 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialServices();
  }, []);

  // 3. 검색 로직 (Debounce 적용)
  useEffect(() => {
    // 초기 로딩 중에는 실행 방지
    if (isLoading && services.length === 0) return;

    const delayDebounceFn = setTimeout(async () => {
      try {
        const results = searchTerm.trim()
          ? await ThirdPartyListService.searchServices({ keyword: searchTerm })
          : await ThirdPartyListService.getServices();
        setServices(results);
      } catch (error) {
        console.error("Search Error:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 4. 핸들러
  const handleServiceClick = (id: string) => {
    navigate(`/third-partys/${id}`);
  };

  const handleFilterClick = () => {
    toast.info("카테고리 필터 기능은 준비 중입니다.");
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="Third-party Services"
        description="External services to enhance your applications"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={(val) => setSearchTerm(val)}
        onFilterClick={handleFilterClick}
      />

      {/* 3. 리스트 표시 영역 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-500 font-medium">Loading services...</p>
        </div>
      ) : (
        <>
          {services.length > 0 ? (
            <ConceptGrid>
              {services.map((service) => (
                <ThirdPartyCard
                  key={service.id}
                  id={service.id.toString()}
                  name={service.name}
                  description={service.description}
                  category={service.category}
                  onClick={handleServiceClick}
                />
              ))}
            </ConceptGrid>
          ) : (
            <div className="py-24 text-center">
              <p className="text-gray-500 text-lg font-medium">
                No services found.
              </p>
              <p className="text-gray-400 text-sm">
                Try searching with a different keyword.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
