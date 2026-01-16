import { useNavigate } from "react-router-dom";
import StudyPlanForm from "../../components/Woomoonkyung/StudyPlanForm";
import { PlanRegistrationService } from "../../api/Woomoonkyung/StudyPlanCreatePage"; // 경로 확인 필요

import { toast } from "react-toastify";
import { useState } from "react";
import { LoginService } from "../../api/Auth/LoginPage";
import { StudyPlanFormFormData } from "../../types/pages/Woomoonkyung/StudyPlanForm";

export default function StudyPlanCreatePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * [공부 계획 저장 핸들러]
   * @param data 폼에서 입력된 데이터
   * @param imageFile 선택된 이미지 파일 (있을 경우)
   */
  const handleSave = async (data: StudyPlanFormFormData, imageFile?: File) => {
    try {
      setIsSubmitting(true);

      // 1. 현재 로그인한 유저 ID 확보
      const userId = await LoginService.getCurrentUserId();
      if (!userId) {
        toast.error("로그인이 필요한 서비스입니다.");
        return;
      }

      // 2. 서비스 호출하여 계획 생성 및 이미지 업로드
      const newPlanId = await PlanRegistrationService.createBasePlan({
        planData: {
          ...data,
          user_id: userId,
        },
        imageFile: imageFile,
      });

      toast.success("공부 계획 기본 정보가 생성되었습니다.");

      // 3. 생성된 ID를 가지고 노드 생성 페이지로 이동
      navigate(`/woomoonkyung/create/node/${newPlanId}`);
    } catch (error) {
      console.error("저장 실패:", error);
      toast.error("공부 계획 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {isSubmitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
              <p className="font-medium text-gray-600">
                계획을 생성 중입니다...
              </p>
            </div>
          </div>
        )}

        <StudyPlanForm
          mode="create"
          onSave={handleSave}
          onCancel={() => navigate("/woomoonkyung")}
        />
      </div>
    </div>
  );
}
