import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// 서비스 및 타입
import { ThirdPartyDetailService } from "../../api/Concepts/ThirdPartyDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { ThirdPartyDetailResponse } from "../../types/api/Concepts/ThirdPartyDetailPage";
import { TodoForm } from "../../types/pages/CompanyInformation/AddTodoModal";

// 컴포넌트
import BackButton from "../../components/Concepts/BackButton";
import ThirdPartyHeader from "../../components/Concepts/ThirdPartyDetailPage/ThirdPartyHeader";
import ThirdPartyActionButtons from "../../components/Concepts/ThirdPartyDetailPage/ThirdPartyActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import RelatedItemGrid from "../../components/Concepts/CodingToolDetailPage/RelatedItemGrid";
import AIChat from "../../components/CompanyInformation/CompanyInformationAIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function ThirdPartyDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  // 1. 상태 관리
  const [service, setService] = useState<ThirdPartyDetailResponse | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  // 2. 초기 데이터 로드
  useEffect(() => {
    const fetchDetail = async () => {
      if (!serviceId) return;

      try {
        setIsLoading(true);
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        const data = await ThirdPartyDetailService.getServiceDetail({
          serviceId,
          userId: currentUserId,
        });
        setService(data);
      } catch (error) {
        console.error(error);
        toast.error("서비스 상세 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [serviceId]);

  // 3. 핸들러 로직

  // [이해함 토글]
  const handleToggleUnderstood = async () => {
    if (!service || !userId || !serviceId) return;

    try {
      const newStatus = await ThirdPartyDetailService.toggleServiceUnderstood({
        userId,
        serviceId,
        currentStatus: service.isUnderstood,
      });

      setService({ ...service, isUnderstood: newStatus });
      toast.success(newStatus ? "학습 완료!" : "학습 취소됨");
    } catch (error) {
      toast.error("상태 변경 중 오류가 발생했습니다.");
    }
  };

  // [Todo 추가 확정]
  const handleAddTodoConfirm = async (formData: TodoForm) => {
    if (!userId || !service || !showTodoModal) return;

    try {
      await ThirdPartyDetailService.addServiceTodo({
        userId,
        serviceName: service.name,
        type: showTodoModal,
      });
      toast.success("할 일 목록에 추가되었습니다.");
      setShowTodoModal(false);
    } catch (error) {
      toast.error("Todo 저장에 실패했습니다.");
      throw error; // 모달 내부 에러 처리를 위해 throw
    }
  };

  // 4. 로딩 및 예외 처리
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="mt-4 font-medium text-gray-500">
          서비스 정보를 가져오는 중...
        </p>
      </div>
    );
  }

  if (!service) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <BackButton to="/third-partys" label="Back to Services" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <ThirdPartyHeader
          name={service.name}
          category={service.category}
          description={service.description}
          officialSite={service.officialSite}
          isUnderstood={service.isUnderstood}
          onToggleUnderstood={handleToggleUnderstood}
        />

        <div className="my-8 border-t border-gray-100" />

        <ThirdPartyActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        <div className="mt-8 prose max-w-none">
          <MarkdownRenderer content={service.content} />
        </div>
      </div>

      <RelatedItemGrid
        title="Related Services & Concepts"
        items={service.relatedConcepts}
        basePath="/third-partys"
      />

      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={service.name}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen
          onClose={() => setShowTodoModal(false)}
          conceptName={service.name}
          todoType={showTodoModal}
          onConfirm={handleAddTodoConfirm}
        />
      )}
    </div>
  );
}
