import { useNavigate } from "react-router-dom";
import { tools } from "../../data/Concepts/tools";
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import ToolCard from "../../components/Concepts/CodingToolsList/ToolCard";

// 분리/재사용 컴포넌트들


export default function CodingToolsList() {
  const navigate = useNavigate();

  // 상세 페이지 이동 핸들러
  const handleToolClick = (id: string) => {
    navigate(`/coding-tools/${id}`);
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 (재사용) */}
      <ConceptListHeader
        title="Coding Tools"
        description="Essential tools for development workflow"
      />

      {/* 2. 검색 및 필터 바 (재사용) */}
      <ConceptSearchBar
        onSearchChange={(val) => console.log("Tool Search:", val)}
        onFilterClick={() => console.log("Tool Filter Click")}
      />

      {/* 3. 도구 카드 그리드 리스트 */}
      <ConceptGrid>
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            name={tool.name}
            description={tool.description}
            category={tool.category}
            tags={tool.tags}
            onClick={handleToolClick}
          />
        ))}
      </ConceptGrid>
    </div>
  );
}
