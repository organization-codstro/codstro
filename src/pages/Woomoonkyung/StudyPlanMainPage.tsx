import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// API 서비스 및 타입 임포트
import { WoomoonkyungMainService } from "../../api/Woomoonkyung/StudyPlanMainPage";
import { PlanWithStats } from "../../types/api/Woomoonkyung/StudyPlanMainPage";
import { stateColors } from "../../data/Woomoonkyung/woomoonkyungData";

// 컴포넌트 임포트
import StudyPlanCard from "../../components/Woomoonkyung/StudyPlanMainPage/StudyPlanCard";
import DashboardHeader from "../../components/Woomoonkyung/StudyPlanMainPage/DashboardHeader";
import ActivePlanSection from "../../components/Woomoonkyung/StudyPlanMainPage/ActivePlanSection";
import EmptyPlanState from "../../components/Woomoonkyung/StudyPlanMainPage/EmptyPlanState";
import { LoginService } from "../../api/Auth/LoginPage";

export default function StudyPlanMainPage() {
  const navigate = useNavigate();

  // 🔹 상태 관리
  const [plans, setPlans] = useState<PlanWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 🔹 데이터 페칭 로직
  const fetchActivePlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const userId = await LoginService.getCurrentUserId();

      const data = await WoomoonkyungMainService.getActiveMyPlans({
        userId: userId!,
      });
      setPlans(data);
    } catch (error) {
      toast.error("학습 계획을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivePlans();
  }, [fetchActivePlans]);

  // 🔹 삭제 핸들러
  const handleDeletePlan = async (e: React.MouseEvent, planId: string) => {
    e.stopPropagation();

    if (!window.confirm("정말 이 계획을 삭제하시겠습니까?")) return;

    try {
      setDeletingId(planId);
      await WoomoonkyungMainService.deletePlan({ planId });

      toast.success("공부 계획이 삭제되었습니다.");
      // 로컬 상태 업데이트 (다시 fetch하지 않고 필터링)
      setPlans((prev) => prev.filter((p) => p.study_plan_id !== planId));
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 헤더 영역 */}
        <DashboardHeader
          title="Woomoonkyung"
          description="현재 진행 중인 나의 학습 계획을 관리하세요"
          onArchiveClick={() => navigate("/woomoonkyung/archive")}
          onCreateClick={() => navigate("/woomoonkyung/create")}
        />

        {/* 진행 중인 플랜 섹션 */}
        <ActivePlanSection count={plans.length}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-10 h-10 mb-4 animate-spin text-[#587CF0]" />
              <p>데이터를 불러오는 중입니다...</p>
            </div>
          ) : plans.length === 0 ? (
            <EmptyPlanState
              message="현재 진행 중인 나의 계획이 없습니다."
              actionLabel="새로운 계획을 만들어보세요"
              onActionClick={() => navigate("/woomoonkyung/create")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <StudyPlanCard
                  key={plan.study_plan_id}
                  plan={plan}
                  completedNodes={plan.stats.completed}
                  totalNodes={plan.stats.total}
                  progress={plan.stats.progress}
                  stateColors={stateColors}
                  onPlanClick={(id) => navigate(`/woomoonkyung/plan/${id}`)}
                  onDeleteClick={(e) => handleDeletePlan(e, plan.study_plan_id)}
                  // 삭제 중일 때 UI 피드백을 주기 위한 prop (StudyPlanCard에서 처리 가능 시)
                  isDeleting={deletingId === plan.study_plan_id}
                />
              ))}
            </div>
          )}
        </ActivePlanSection>
      </div>
    </div>
  );
}
