import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// 서비스 및 타입
import { ConceptDetailResponse } from "../../types/api/Concepts/BasicConceptDetailPage";
import { TodoForm } from "../../types/pages/CompanyInformation/AddTodoModal";

// 공통 컴포넌트
import AIChat from "../../components/CompanyInformation/CompanyInformationAIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import BackButton from "../../components/Concepts/BackButton";
import ConceptHeader from "../../components/Concepts/BasicConceptDetailPage/ConceptHeader";
import ConceptActionButtons from "../../components/Concepts/BasicConceptDetailPage/ConceptActionButtons";
import RelatedConceptGrid from "../../components/Concepts/BasicConceptDetailPage/RelatedConceptGrid";
import { LoginService } from "../../api/Auth/LoginPage";
import { BasicConceptDetailService } from "../../api/Concepts/BasicConceptDetailPage";
import NotFoundPage from "../NotFound/NotFoundPage";

// 로딩 및 에러 뷰
const LoadingView = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <p className="text-gray-500 animate-pulse">
      개념 정보를 불러오는 중입니다...
    </p>
  </div>
);

export default function BasicConceptDetailPage() {
  const { conceptId } = useParams<{ conceptId: string }>();

  // 1. 상태 관리
  const [data, setData] = useState<ConceptDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // 모달 및 채팅 상태
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  // 2. 초기 데이터 페칭 (Core Principle: useEffect)
  useEffect(() => {
    const initPage = async () => {
      if (!conceptId) return;

      try {
        setIsLoading(true);
        // 유저 정보 확인
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          return;
        }

        // API 호출
        const response = await BasicConceptDetailService.getConceptDetail({
          conceptId,
          userId: currentUserId,
        });
        setData(response);
      } catch (error: any) {
        console.error("Fetch Error:", error);
        toast.error("데이터 로딩 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [conceptId]);

  // 3. 비즈니스 로직 핸들러

  // [이해함 토글]
  const handleToggleUnderstood = async () => {
    if (!userId || !conceptId || !data) return;

    try {
      const updatedStatus =
        await BasicConceptDetailService.toggleUnderstoodStatus({
          userId,
          conceptId,
          currentStatus: data.isUnderstood,
        });

      setData({ ...data, isUnderstood: updatedStatus });
      toast.success(
        updatedStatus
          ? "학습 완료로 표시되었습니다."
          : "학습 완료가 취st 취소되었습니다.",
      );
    } catch (error) {
      toast.error("상태 변경에 실패했습니다.");
    }
  };

  // [Todo 추가 확정]
  const handleAddTodoConfirm = async (formData: TodoForm) => {
    if (!userId || !conceptId || !showTodoModal) return;

    try {
      // API 서비스 호출 (기본 구조 유지하며 필요 시 formData 활용 가능하도록 설계)
      await BasicConceptDetailService.addConceptTodo({
        userId,
        conceptId,
        type: showTodoModal,
      });

      toast.success("🚀 할 일 리스트에 성공적으로 추가되었습니다!");
      setShowTodoModal(false);
    } catch (error) {
      toast.error("Todo 등록 중 오류가 발생했습니다.");
      throw error; // 모달 내 Pending 상태 유지를 위해 에러 전파
    }
  };

  // 4. 조건부 렌더링
  if (isLoading) return <LoadingView />;
  if (!conceptId || !data) return <NotFoundPage />;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 뒤로가기 버튼 */}
      <BackButton to="/basic-concepts" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* 개념 헤더: tags 제거, category 반영 */}
        <ConceptHeader
          name={data.name}
          category={data.category}
          description={data.description}
          isUnderstood={data.isUnderstood}
          onToggleUnderstood={handleToggleUnderstood}
        />

        {/* 액션 버튼 (AI 채팅, Todo 추가) */}
        <ConceptActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        {/* 마크다운 본문 영역 */}
        <div className="pt-10 mt-10 prose border-t max-w-none">
          <MarkdownRenderer content={data.content} />
        </div>
      </div>

      {/* 연관 개념 그리드 */}
      <RelatedConceptGrid relatedConcepts={data.relatedConcepts} />

      {/* 모달 컴포넌트들 */}
      {showAIChat && (
        <AIChat
          isOpen={showAIChat}
          onClose={() => setShowAIChat(false)}
          conceptName={data.name}
        />
      )}

      {showTodoModal && (
        <AddTodoModal
          isOpen={true}
          onClose={() => setShowTodoModal(false)}
          conceptName={data.name}
          todoType={showTodoModal}
          onConfirm={handleAddTodoConfirm}
        />
      )}
    </div>
  );
}
