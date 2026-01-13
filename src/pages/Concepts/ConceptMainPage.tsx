//mbit main 페이지, 지금은 사용하지 않음

import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { recommendedConcepts } from "../../data/Concepts/recommendedConcepts";
import { documentationSites } from "../../data/Concepts/documentationSites";
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import DocumentationSection from "../../components/Concepts/ConceptMainPage/DocumentationSection";
import RecommendedGrid from "../../components/Concepts/ConceptMainPage/RecommendedGrid";

export default function ConceptMainPage() {
  const navigate = useNavigate();

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

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 */}
      <ConceptListHeader
        title="Coding Concept Library"
        description="Learn and organize coding concepts, libraries, and frameworks"
      />

      {/* 2. 추천 섹션 */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6" style={{ color: "#587CF0" }} />
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended For You
          </h2>
        </div>

        <RecommendedGrid
          items={recommendedConcepts}
          onItemClick={handleConceptClick}
        />
      </section>

      {/* 3. 문서 자원 섹션 */}
      <DocumentationSection data={documentationSites} />
    </div>
  );
}
