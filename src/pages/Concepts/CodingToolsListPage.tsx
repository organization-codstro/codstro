import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// API 서비스 및 타입
import { ToolSummaryResponse } from "../../types/api/Concepts/CodingToolsListPage";
import { TodoForm } from "../../types/pages/CompanyInformation/AddTodoModal";
import { CodingToolsListService } from "../../api/Concepts/CodingToolsListPage";
import { CodingToolDetailService } from "../../api/Concepts/CodingToolDetailPage";

// 컴포넌트
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import ToolCard from "../../components/Concepts/CodingToolsList/ToolCard";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import { LoginService } from "../../api/Auth/LoginPage";

export default function CodingToolsListPage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [tools, setTools] = useState<ToolSummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Todo 모달 관리 상태
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);
  const [selectedTool, setSelectedTool] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // 2. 초기 데이터 로드
  useEffect(() => {
    const initPage = async () => {
      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        const data = await CodingToolsListService.getTools();
        setTools(data);
      } catch (error: any) {
        toast.error("도구 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, []);

  // 3. 검색 로직 (Debounce 적용)
  useEffect(() => {
    if (searchTerm === "" && !isLoading && tools.length === 0) return;

    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = searchTerm
          ? await CodingToolsListService.searchTools({ keyword: searchTerm })
          : await CodingToolsListService.getTools();
        setTools(data);
      } catch (error) {
        toast.error("검색 중 오류가 발생했습니다.");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 4. 핸들러
  const handleToolClick = (id: string) => {
    navigate(`/coding-tools/${id}`);
  };

  const handleAddTodoConfirm = async (formData: TodoForm) => {
    if (!userId || !selectedTool || !showTodoModal) return;

    try {
      await CodingToolDetailService.addToolTodo({
        userId,
        toolName: selectedTool.name,
        type: showTodoModal,
      });

      toast.success("todo가 성공적으로 추가되었습니다!");
      setShowTodoModal(false);
    } catch (error) {
      toast.error("Todo 등록 실패");
      throw error;
    }
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="Coding Tools"
        description="Essential tools for development workflow"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={(val) => setSearchTerm(val)}
        onFilterClick={() => toast.info("필터 기능 준비 중")}
      />

      {/* 3. 결과 리스트 처리 */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-500">
          도구 정보를 불러오는 중...
        </div>
      ) : tools.length === 0 ? (
        <div className="py-20 text-center text-gray-500 text-lg">
          검색 결과와 일치하는 도구가 없습니다.
        </div>
      ) : (
        <ConceptGrid>
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              category={tool.category}
              onClick={handleToolClick}
            />
          ))}
        </ConceptGrid>
      )}

      {/* 4. 공용 Todo 모달 */}
      {showTodoModal && selectedTool && (
        <AddTodoModal
          isOpen={true}
          onClose={() => {
            setShowTodoModal(false);
            setSelectedTool(null);
          }}
          conceptName={selectedTool.name}
          todoType={showTodoModal}
          onConfirm={handleAddTodoConfirm}
        />
      )}
    </div>
  );
}
