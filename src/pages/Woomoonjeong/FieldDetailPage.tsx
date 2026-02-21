import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// API 서비스 및 인증 서비스
import { FieldDetailService } from "../../api/Woomoonjeong/FieldDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";

// 타입 및 데이터
import { FieldDetailData } from "../../types/pages/Woomoonjeong/FieldDetailPage/FieldDetailPage";

// 기존 컴포넌트
import AssignRecommendedFieldModal from "../../components/Woomoonjeong/RecommendedCreateFieldModal";
import FieldDetailHeader from "../../components/Woomoonjeong/FieldDetailPage/FieldDetailHeader";
import PinList from "../../components/Woomoonjeong/FieldDetailPage/PinList";
import { GROUP_TYPE_COLORS } from "../../constants/Woomoonjeong/woomoonjeong";

export default function FieldDetailPage() {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();

  // --- 상태 관리 ---
  const [data, setData] = useState<FieldDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- 데이터 로드 (useEffect) ---
  useEffect(() => {
    const initPage = async () => {
      if (!fieldId) {
        toast.error("잘못된 접근입니다.");
        navigate("/woomoonjeong/documents/management");
        return;
      }

      setIsLoading(true);
      try {
        // 1. 유저 ID 확보
        const userId = await LoginService.getCurrentUserId();
        setCurrentUserId(userId);

        // 2. 분야 상세 정보 및 핀 목록 조회
        const fieldData = await FieldDetailService.getFieldDetailWithPins({
          fieldId,
        });
        setData(fieldData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [fieldId, navigate]);

  // 데이터 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="font-medium text-gray-500">
          상세 정보를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  // 데이터가 없을 때 (NotFoundView)
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Field not found</h2>
          <p className="mt-2 text-gray-500">
            요청하신 분야 정보를 찾을 수 없습니다.
          </p>
          <button
            onClick={() => navigate("/woomoonjeong/documents/recommended")}
            className="px-6 py-2 mt-4 font-medium text-white rounded-lg bg-[#587CF0]"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <FieldDetailHeader
        fieldName={data.field_name}
        groupName={data.groups.group_name}
        groupColorClass={
          GROUP_TYPE_COLORS[
            data.groups.group_name as keyof typeof GROUP_TYPE_COLORS
          ] || "border-gray-200"
        }
        description={data.field_description}
        onBack={() => navigate("/woomoonjeong/documents/recommended")}
        onAddField={() => setIsAddModalOpen(true)}
      />

      <div className="p-8 mx-auto max-w-7xl">
        <PinList pins={data.pins} />
      </div>

      <AssignRecommendedFieldModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        field={{
          field_id: data.field_id,
          field_name: data.field_name,
          field_description: data.field_description,
          create_at: data.field_created_date,
        }}
        onAdd={() => {
          toast.success("분야가 성공적으로 할당되었습니다.");
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}
