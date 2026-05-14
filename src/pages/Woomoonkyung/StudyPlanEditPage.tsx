import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StudyPlanEditService } from "../../api/Woomoonkyung/StudyPlanEditPage";
import { StudyPlanForm } from "../../components/Woomoonkyung/StudyPlanForm";
import { PageHeader } from "../../components/Woomoonkyung/StudyPlanEditPage/PageHeader";
import { LoginService } from "../../api/Auth/LoginPage";
import { StudyPlan } from "../../types/common/Woomoonkyung";
import { NotFoundPage } from "../NotFound/NotFoundPage";

export default function StudyPlanEditPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  /** 1. 기존 플랜 데이터 로드 (DB 조회) */
  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) return;
      try {
        setIsLoading(true);
        const data = await StudyPlanEditService.getPlanForEdit({ planId });
        const userId = await LoginService.getCurrentUserId();
        setUserId(userId);
        setPlan(data);
      } catch (error) {
        console.error(error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, [planId]);

  /** 2. 정보 수정 핸들러 */
  const handleSave = async (planData: any, imageFile?: File) => {
    if (!planId) return;

    try {
      setIsUpdating(true);
      const loadingToast = toast.loading("계획 정보를 수정 중입니다...");

      await StudyPlanEditService.updateStudyPlan({
        planId,
        planData,
        imageFile,
      });

      toast.update(loadingToast, {
        render: "공부 계획이 성공적으로 수정되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });

      // 상세 페이지로 이동
      navigate(`/woomoonkyung/plan/${planId}`);
    } catch (error) {
      console.error(error);
      toast.error("수정에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate(`/woomoonkyung/plan/${planId}`);
  };

  /** 로딩 중 UI */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#587CF0]"></div>
      </div>
    );
  }

  /** 플랜이 없을 경우 처리 */
  if (!plan) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="Edit Study Plan"
          description="Update your study plan information and keep your goals on track."
        />

        <div className="relative p-8 bg-white border border-purple-100 shadow-xl rounded-2xl">
          {/* 업데이트 중 오버레이 (선택사항) */}
          {isUpdating && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/50 backdrop-blur-sm">
              <p className="font-semibold text-[#587CF0]">저장 중...</p>
            </div>
          )}

          <StudyPlanForm
            mode="edit"
            existingPlan={plan}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
