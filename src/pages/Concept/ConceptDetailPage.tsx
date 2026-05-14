import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// 서비스 및 타입
import { ConceptDetailResponse } from "../../types/api/Concept/ConceptDetailPage";
import { TodoForm } from "../../types/pages/CompanyInformation/AddTodoModal";
import { LoginService } from "../../api/Auth/LoginPage";
import { ConceptDetailService } from "../../api/Concept/ConceptDetailPage";

// 공통 컴포넌트
import { CompanyInformationAIChat } from "../../components/Concept/ConceptDetailPage/CompanyInformationAIChat";
import { AddTodoModal } from "../../components/CompanyInformation/AddTodoModal";
import { MarkdownRenderer } from "../../components/Markdown/MarkdownRenderer";
import { BackButton } from "../../components/Concept/BackButton";
import { ConceptHeader } from "../../components/Concept/ConceptDetailPage/ConceptHeader";
import { ConceptServiceActionButtons } from "../../components/Concept/ConceptDetailPage/ConceptServiceActionButtons";
import { RelatedItemGrid } from "../../components/Concept/ConceptDetailPage/RelatedItemGrid";
import { NotFoundPage } from "../NotFound/NotFoundPage";
import {
  GROUP_NAME,
  GROUP_NAME_TYPE,
} from "../../constants/Woomoonjeong/Woomoonjeong";
import { ConceptActionButtons } from "../../components/Concept/ConceptDetailPage/ConceptActionButtons";
import { ConceptEditMetaModal } from "../../components/Concept/ConceptDetailPage/ConceptEditMetaModal";

export default function ConceptDetailPage() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();

  // 1. 상태 관리
  const [data, setData] = useState<ConceptDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  //삭제 상태 관리
  const [deleteConfirmMode, setDeleteConfirmMode] = useState(false);
  const deleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 기본 정보 수정 모달
  const [isMetaModalOpen, setIsMetaModalOpen] = useState(false);
  const [isSavingMeta, setIsSavingMeta] = useState(false);

  // availableGroups 정의
  const availableGroups = GROUP_NAME.map(
    (groupName): { group_id: GROUP_NAME_TYPE; group_name: string } => ({
      group_id: groupName,
      group_name: groupName.charAt(0).toUpperCase() + groupName.slice(1),
    }),
  );

  // 2. 초기 데이터 로딩
  useEffect(() => {
    const initPage = async () => {
      if (!conceptId) return;

      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);
        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          return;
        }

        const response = await ConceptDetailService.getConceptDetail({
          conceptId,
          userId: currentUserId,
        });
        setData(response);
      } catch (error: any) {
        console.error(error);
        toast.error("개념 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [conceptId]);

  //esc 누르면 뒤로 가는 이벤트 함수
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/concepts");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  // 3. 핸들러 함수

  // 개념 마크다운 수정 페이지 이동
  const handleEdit = () => {
    if (!data) return;
    navigate(`/concepts/${conceptId}/edit`);
  };

  // [Todo 추가 확정 - onConfirm]
  const handleAddTodoConfirm = async (formData: TodoForm) => {
    console.log("삭제요청");
    if (!userId || !data || !showTodoModal) return;

    try {
      await ConceptDetailService.addConceptTodo({
        userId,
        conceptName: data.name,
        type: showTodoModal,
      });

      toast.success("Todo 리스트에 추가되었습니다.");
      setShowTodoModal(false);
    } catch (error) {
      toast.error("Todo 등록 중 오류가 발생했습니다.");
      throw error; // 모달 내 Pending 상태 유지를 위해 에러 전파
    }
  };

  // 기본 정보 수정 모달 저장
  const handleSaveMeta = async (formData: {
    title: string;
    description: string;
    labels: string[];
  }) => {
    if (!conceptId) return;
    try {
      setIsSavingMeta(true);
      await ConceptDetailService.updateConceptMeta({
        conceptId,
        title: formData.title,
        description: formData.description,
        labels: formData.labels,
      });

      // name, category로 맞춰서 업데이트
      setData((prev) =>
        prev
          ? {
              ...prev,
              name: formData.title,
              description: formData.description,
              category: formData.labels,
            }
          : prev,
      );
      toast.success("개념 정보가 수정되었습니다.");
      setIsMetaModalOpen(false);
    } catch (error) {
      toast.error("개념 정보 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSavingMeta(false);
    }
  };

  // 개념 삭제
  const handleDelete = async () => {
    if (!conceptId) return;

    // 1단계: 확인 모드 진입 (3초 타이머)
    if (!deleteConfirmMode) {
      setDeleteConfirmMode(true);
      deleteTimerRef.current = setTimeout(() => {
        setDeleteConfirmMode(false);
      }, 3000);
      return;
    }

    // 2단계: 확인 모드에서 한 번 더 누르면 실제 삭제
    if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    setDeleteConfirmMode(false);

    try {
      setIsDeleting(true);
      const { deletedNoteCount, unlinkedNoteCount } =
        await ConceptDetailService.deleteConcept({ conceptId });

      if (deletedNoteCount > 0 && unlinkedNoteCount > 0) {
        toast.success(
          `개념이 삭제되었습니다. (노트 ${deletedNoteCount}개 함께 삭제, ${unlinkedNoteCount}개는 유지)`,
        );
      } else if (deletedNoteCount > 0) {
        toast.success(
          `개념이 삭제되었습니다. (연결된 노트 ${deletedNoteCount}개 함께 삭제)`,
        );
      } else if (unlinkedNoteCount > 0) {
        toast.success(
          `개념이 삭제되었습니다. (연결된 노트 ${unlinkedNoteCount}개는 다른 개념이 있어 유지)`,
        );
      } else {
        toast.success("개념이 삭제되었습니다.");
      }

      navigate("/concepts");
    } catch (error) {
      toast.error("개념 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    };
  }, []);

  // 4. 로딩 및 예외 처리 UI
  if (isLoading)
    return (
      <div className="p-20 text-center text-gray-500">
        Loading concept details...
      </div>
    );

  if (!data || !conceptId) return <NotFoundPage />;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 */}
      <BackButton to="/concepts" label="Back to concepts" />

      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-start justify-between ">
          {/* 2. 개념 상단 정보 (tags 제거, category 배열 사용) */}
          <ConceptHeader
            name={data.name}
            field={data.field}
            description={data.description}
          />

          <ConceptActionButtons
            onEdit={handleEdit}
            onEditMeta={() => setIsMetaModalOpen(true)}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            deleteConfirmMode={deleteConfirmMode}
            officialSite={data.officialSite}
          />
        </div>

        <div className="mt-4 mb-8 border-t border-gray-100" />

        {/* 3. 액션 버튼 */}
        <ConceptServiceActionButtons
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
      <CompanyInformationAIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={data.name}
        conceptId={conceptId}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen={true}
          onClose={() => setShowTodoModal(false)}
          conceptName={data.name}
          todoType={showTodoModal}
          onConfirm={handleAddTodoConfirm}
          availableGroups={availableGroups}
        />
      )}

      {/* 7. 기본 정보 수정 모달 */}
      <ConceptEditMetaModal
        isOpen={isMetaModalOpen}
        onClose={() => setIsMetaModalOpen(false)}
        onSave={handleSaveMeta}
        initialTitle={data.name}
        initialDescription={data.description || ""}
        initialLabels={data.category || []}
        isSaving={isSavingMeta}
      />
    </div>
  );
}
