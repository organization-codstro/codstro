import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// 서비스 및 타입
import { LibraryDetailResponse } from "../../types/api/Concepts/LibraryDetailPage";
import { TodoForm } from "../../types/pages/CompanyInformation/AddTodoModal";
import { LoginService } from "../../api/Auth/LoginPage";
import { LibraryDetailService } from "../../api/Concepts/LibraryDetailPage";

// 공통 컴포넌트
import AIChat from "../../components/CompanyInformation/CompanyInformationAIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import BackButton from "../../components/Concepts/BackButton";
import LibraryHeader from "../../components/Concepts/LibraryDetailPage/LibraryHeader";
import LibraryActionButtons from "../../components/Concepts/LibraryDetailPage/LibraryActionButtons";
import RelatedItemGrid from "../../components/Concepts/CodingToolDetailPage/RelatedItemGrid";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function LibraryDetailPage() {
  const { libraryId } = useParams<{ libraryId: string }>();

  // 1. 상태 관리
  const [data, setData] = useState<LibraryDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  // 2. 초기 데이터 로딩
  useEffect(() => {
    const initPage = async () => {
      if (!libraryId) return;

      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);
        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          return;
        }

        const response = await LibraryDetailService.getLibraryDetail({
          libraryId,
          userId: currentUserId,
        });
        setData(response);
      } catch (error: any) {
        console.error(error);
        toast.error("라이브러리 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [libraryId]);

  // 3. 핸들러 함수

  // [이해함 상태 토글]
  const handleToggleUnderstood = async () => {
    if (!userId || !libraryId || !data) return;

    try {
      const updatedStatus = await LibraryDetailService.toggleLibraryUnderstood({
        userId,
        libraryId,
        currentStatus: data.isUnderstood,
      });

      setData({ ...data, isUnderstood: updatedStatus });
      toast.success(
        updatedStatus ? "학습 완료로 표시되었습니다." : "취소되었습니다.",
      );
    } catch (error) {
      toast.error("상태 변경에 실패했습니다.");
    }
  };

  // [Todo 추가 확정 - onConfirm]
  const handleAddTodoConfirm = async (formData: TodoForm) => {
    if (!userId || !data || !showTodoModal) return;

    try {
      await LibraryDetailService.addLibraryTodo({
        userId,
        libraryName: data.name,
        type: showTodoModal,
      });

      toast.success("Todo 리스트에 추가되었습니다.");
      setShowTodoModal(false);
    } catch (error) {
      toast.error("Todo 등록 중 오류가 발생했습니다.");
      throw error; // 모달 내 Pending 상태 유지를 위해 에러 전파
    }
  };

  // 4. 로딩 및 예외 처리 UI
  if (isLoading)
    return (
      <div className="p-20 text-center text-gray-500">
        Loading library details...
      </div>
    );
  if (!data) return <NotFoundPage />;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 */}
      <BackButton to="/libraries" label="Back to Libraries" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* 2. 라이브러리 상단 정보 (tags 제거, category 배열 사용) */}
        <LibraryHeader
          name={data.name}
          language={data.language}
          description={data.description}
          category={data.category}
          officialSite={data.officialSite}
          isUnderstood={data.isUnderstood}
          onToggleUnderstood={handleToggleUnderstood}
        />

        <div className="my-8 border-t border-gray-100" />

        {/* 3. 액션 버튼 */}
        <LibraryActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        {/* 4. 마크다운 본문 */}
        <div className="mt-8 prose max-w-none">
          <MarkdownRenderer content={data.content} />
        </div>
      </div>

      {/* 5. 연관 아이템 그리드 */}
      <RelatedItemGrid
        title="Related Concepts"
        items={data.relatedConcepts}
        basePath="/basic-concepts"
      />

      {/* 6. 모달 및 채팅 레이어 */}
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
          onConfirm={handleAddTodoConfirm} // onConfirm 전달
        />
      )}
    </div>
  );
}
