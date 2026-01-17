import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// 서비스 및 타입
import { RecommendedMaterialResponse } from "../../types/api/Concepts/ConceptMainPage";
import { ConceptMainService } from "../../api/Concepts/ConceptMainPage";

// 컴포넌트
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import RecommendedGrid from "../../components/Concepts/ConceptMainPage/RecommendedGrid";
import { LoginService } from "../../api/Auth/LoginPage";

export default function ConceptMainPage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [recommendedItems, setRecommendedItems] = useState<
    RecommendedMaterialResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. 초기 데이터 페칭
  useEffect(() => {
    const fetchMainData = async () => {
      try {
        setIsLoading(true);
        const userId = await LoginService.getCurrentUserId();
        if (!userId) {
          toast.error("사용자 정보를 불러오는 데 실패했습니다.");
          return;
        }

        const recommended = await ConceptMainService.getRecommendedMaterials();

        setRecommendedItems(recommended);
      } catch (error) {
        console.error("Main Page Loading Error:", error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainData();
  }, []);

  // 타입별 라우팅 처리 로직
  const handleConceptClick = (type: string, id: string) => {
    const routes: Record<string, string> = {
      library: `/libraries/${id}`,
      concept: `/basic-concepts/${id}`,
      tool: `/coding-tools/${id}`,
      service: `/third-party/${id}`,
    };
    navigate(routes[type] || "/concepts");
  };

  if (isLoading) {
    return (
      <div className="p-20 text-center text-gray-500">
        지식을 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 */}
      <ConceptListHeader
        title="Coding Concept Library"
        description="Learn and organize coding concepts, libraries, and frameworks"
      />

      {/* 2. 추천 섹션 */}
      <section className="mb-12">
        {recommendedItems.length > 0 ? (
          <RecommendedGrid
            title={`Recommended For You (${recommendedItems.length})`}
            items={recommendedItems}
            onItemClick={handleConceptClick}
          />
        ) : (
          <div className="p-10 text-center text-gray-400 border border-dashed rounded-lg">
            추천할 개념이 아직 없습니다.
          </div>
        )}
      </section>
    </div>
  );
}
