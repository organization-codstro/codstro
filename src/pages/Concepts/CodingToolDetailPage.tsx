import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// API 서비스 및 타입
import { ToolDetailResponse } from "../../types/api/Concepts/CodingToolDetailPage";
import { TodoForm } from "../../types/pages/CompanyInformation/AddTodoModal";

// 공통 컴포넌트
import AIChat from "../../components/CompanyInformation/CompanyInformationAIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import BackButton from "../../components/Concepts/BackButton";
import ToolHeader from "../../components/Concepts/CodingToolDetailPage/ToolHeader";
import ToolActionButtons from "../../components/Concepts/CodingToolDetailPage/ToolActionButtons";
import RelatedItemGrid from "../../components/Concepts/CodingToolDetailPage/RelatedItemGrid";
import { LoginService } from "../../api/Auth/LoginPage";
import { CodingToolDetailService } from "../../api/Concepts/CodingToolDetailPage";

export default function CodingToolDetailPage() {
  const { toolId } = useParams<{ toolId: string }>();

  // 1. 상태 관리
  const [data, setData] = useState<ToolDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  // 2. 초기 데이터 페칭 (useEffect)
  useEffect(() => {
    const initPage = async () => {
      if (!toolId) return;

      try {
        setIsLoading(true);
        // 유저 세션 확인
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          return;
        }

        // 도구 상세 정보 로드
        const toolData = await CodingToolDetailService.getToolDetail({
          toolId,
          userId: currentUserId,
        });
        setData(toolData);
      } catch (error: any) {
        console.error("Tool Loading Error:", error);
        toast.error("도구 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [toolId]);

  // 3. 핸들러 함수

  // [이해함 토글]
  const handleToggleUnderstood = async () => {
    if (!userId || !toolId || !data) return;

    try {
      const updatedStatus = await CodingToolDetailService.toggleToolUnderstood({
        userId,
        toolId,
        currentStatus: data.isUnderstood,
      });

      setData({ ...data, isUnderstood: updatedStatus });
      toast.success(
        updatedStatus ? "학습 완료로 표시되었습니다." : "취소되었습니다.",
      );
    } catch (error) {
      toast.error("상태 업데이트에 실패했습니다.");
    }
  };

  // [Todo 추가 확정]
  const handleAddTodoConfirm = async (formData: TodoForm) => {
    if (!userId || !data || !showTodoModal) return;

    try {
      // API 서비스 호출 (AddTodoModal의 formData 정보를 활용하여 등록)
      await CodingToolDetailService.addToolTodo({
        userId,
        toolName: data.name,
        type: showTodoModal,
      });

      toast.success("🚀 할 일 리스트에 등록되었습니다.");
      setShowTodoModal(false);
    } catch (error) {
      toast.error("Todo 등록 중 오류가 발생했습니다.");
      throw error; // 모달 내의 isPending 상태 유지를 위해 throw
    }
  };

  // 4. 로딩 및 예외 처리 UI
  if (isLoading)
    return (
      <div className="p-20 text-center text-gray-500">
        데이터를 불러오는 중입니다...
      </div>
    );
  if (!toolId || !data)
    return (
      <div className="p-20 text-center text-gray-500">Tool not found.</div>
    );

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <BackButton to="/coding-tools" label="Back to Tools" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* ToolHeader: tags 제거 및 category 전달 */}
        <ToolHeader
          name={data.name}
          category={data.category}
          description={data.description}
          isUnderstood={data.isUnderstood}
          onToggleUnderstood={handleToggleUnderstood}
        />

        <ToolActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        <div className="prose max-w-none mt-8 border-t pt-8">
          <MarkdownRenderer content={data.content} />
        </div>
      </div>

      {/* 연관 아이템 그리드 */}
      <RelatedItemGrid
        title="Related Tools"
        items={data.relatedConcepts}
        basePath="/coding-tools"
      />

      {/* 모달 및 채팅 오버레이 */}
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={data.name}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen={true}
          onClose={() => setShowTodoModal(false)}
          conceptName={data.name}
          todoType={showTodoModal}
          onConfirm={handleAddTodoConfirm} // API 연동을 위한 함수 전달
        />
      )}
    </div>
  );
}
