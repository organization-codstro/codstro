import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { TodoForm } from "../../types/pages/CompanyInformation/AddTodoModal";
import { LoginService } from "../../api/Auth/LoginPage";
import { PackageManagerService } from "../../api/Concepts/PackageDetailPage";

// 컴포넌트
import BackButton from "../../components/Concepts/BackButton";
import MaterialHeader from "../../components/Concepts/PackageDetailPage/MaterialHeader";
import MaterialActionButtons from "../../components/Concepts/PackageDetailPage/MaterialActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import RelatedMaterialGrid from "../../components/Concepts/PackageDetailPage/RelatedMaterialGrid";
import AIChat from "../../components/CompanyInformation/CompanyInformationAIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import { PackageManagerMaterial } from "../../types/common/Concepts";
import NotFoundPage from "../NotFound/NotFoundPage";
import {
  GROUP_NAME,
  GROUP_NAME_TYPE,
} from "../../constants/Woomoonjeong/woomoonjeong";

export default function PackageDetailPage() {
  const { materialId } = useParams<{ materialId: string }>();

  // 1. 상태 관리
  const [data, setData] = useState<PackageManagerMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  // availableGroups 정의
  const availableGroups = GROUP_NAME.map(
    (groupName): { group_id: GROUP_NAME_TYPE; group_name: string } => ({
      group_id: groupName,
      group_name: groupName.charAt(0).toUpperCase() + groupName.slice(1),
    }),
  );

  // 2. 초기 데이터 페칭
  useEffect(() => {
    const initPage = async () => {
      if (!materialId) return;

      try {
        setIsLoading(true);
        // 유저 정보 가져오기 (서비스 명세에 따라 number로 변환)
        const currentUserId = await LoginService.getCurrentUserId();
        const numericUserId = Number(currentUserId);
        setUserId(numericUserId);

        const response = await PackageManagerService.getPackageManagerDetail(
          materialId,
          numericUserId,
        );
        setData(response);
      } catch (error) {
        console.error(error);
        toast.error("자료를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [materialId]);

  // 3. 핸들러 함수

  // [이해함 토글]
  const handleToggleUnderstood = async () => {
    if (!userId || !materialId || !data) return;

    try {
      const newStatus = await PackageManagerService.toggleUnderstanding(
        userId,
        materialId,
        data.isUnderstood,
      );
      setData({ ...data, isUnderstood: newStatus });
      toast.success(newStatus ? "학습 완료!" : "학습 취소");
    } catch (error) {
      toast.error("상태 업데이트 실패");
    }
  };

  // [Todo 추가 확정]
  const handleAddTodoConfirm = async (formData: TodoForm) => {
    if (!userId || !data || !showTodoModal) return;

    try {
      await PackageManagerService.addPackageManagerTodo(
        userId,
        data.name,
        showTodoModal,
      );
      toast.success("할 일 목록에 추가되었습니다.");
      setShowTodoModal(false);
    } catch (error) {
      toast.error("Todo 등록 중 오류가 발생했습니다.");
      throw error;
    }
  };

  // 4. 로딩 및 예외 처리
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="mt-4 text-gray-500">패키지 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!data || !materialId) return <NotFoundPage />;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <BackButton to="/package-managers" label="Back to Package Managers" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* 2. 자료 헤더 (isUnderstood 추가) */}
        <MaterialHeader
          name={data.name}
          category={data.category?.[0] || "General"}
          description={data.description}
          tags={data.category}
          documentUrl={data.documentUrl}
          isUnderstood={data.isUnderstood}
          onToggleUnderstood={handleToggleUnderstood}
        />

        <div className="my-8 border-t border-gray-100" />

        {/* 3. 액션 버튼 */}
        <MaterialActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        {/* 4. 마크다운 본문 */}
        <div className="mt-8 prose max-w-none">
          <MarkdownRenderer content={data.content} />
        </div>
      </div>

      {/* 5. 연관 자료 그리드 (API에서 받은 데이터 연결) (relatedMaterials 있어야 나옴)*/}
      {data.relatedMaterials && (
        <RelatedMaterialGrid relatedMaterials={data.relatedMaterials} />
      )}

      {/* 6. 모달 레이어 */}
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={data.name}
        materialId={materialId}
        materialType="packageManager"
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
    </div>
  );
}
