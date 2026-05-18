import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { StudyPlanMainService } from "../../api/StudyPlan/StudyPlanMainPage";
import { PlanWithStats } from "../../types/api/StudyPlan/StudyPlanMainPage";

import { StudyPlanCard } from "../../components/StudyPlan/StudyPlanMainPage/StudyPlanCard";
import { DashboardHeader } from "../../components/StudyPlan/StudyPlanMainPage/DashboardHeader";
import { ActivePlanSection } from "../../components/StudyPlan/StudyPlanMainPage/ActivePlanSection";
import { EmptyPlanState } from "../../components/StudyPlan/StudyPlanMainPage/EmptyPlanState";
import AddStudyPlanAiModal from "../../components/StudyPlan/StudyPlanMainPage/AddStudyPlanAiModal";
import { LoginService } from "../../api/Auth/LoginPage";
import { STATE_COLORS } from "../../constants/StudyPlan/StudyPlan";

export default function StudyPlanMainPage() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState<PlanWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  /**
   * AI 모달 상태
   */
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const fetchActivePlans = useCallback(async (uid?: string) => {
    try {
      setIsLoading(true);
      const resolvedId = uid ?? (await LoginService.getCurrentUserId());
      if (!resolvedId) return;

      if (!uid) setUserId(resolvedId);

      const data = await StudyPlanMainService.getActiveMyPlans({
        userId: resolvedId,
      });
      setPlans(data);
    } catch (error) {
      toast.error("학습 계획을 불러오는데 실패했습니다.");
      console.log("학습 계획 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateStudyPlan = async (data: {
    userId: string;
    name: string;
    description: string;
    goal: string;
    currentLevel?: string;
    maxHours?: number;
    learningStyle: string;
    expectedOutput: string;
    startDate: string;
    endDate: string;
    techStacks: string[];
  }) => {
    const result = await StudyPlanMainService.generateStudyPlan(data);

    if (result.data?.skippedNodes?.length > 0) {
      toast.warn(
        `일부 노드의 기술 스택을 찾지 못했습니다: ${result.data.skippedNodes.join(", ")}`,
      );
    }

    await fetchActivePlans(data.userId);
  };

  useEffect(() => {
    fetchActivePlans();
  }, [fetchActivePlans]);

  const handleDeletePlan = async (
    e: React.MouseEvent<Element>,
    planId: string,
  ) => {
    e.stopPropagation();
    try {
      setDeletingId(planId);
      await StudyPlanMainService.deletePlan({ planId });
      toast.success("공부 계획이 삭제되었습니다.");
      setPlans((prev) => prev.filter((p) => p.study_plan_id !== planId));
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.");
      console.log("삭제중 오류 발생", error);
    } finally {
      setDeletingId(null);
    }
  };

  let planSectionContent;
  if (isLoading) {
    planSectionContent = (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-10 h-10 mb-4 animate-spin text-[#587CF0]" />
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  } else if (plans.length === 0) {
    planSectionContent = (
      <EmptyPlanState
        message="현재 진행 중인 나의 계획이 없습니다."
        actionLabel="새로운 계획을 만들어보세요"
        onActionClick={() => navigate("/study-plan/create")}
      />
    );
  } else {
    planSectionContent = (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <StudyPlanCard
            key={plan.study_plan_id}
            plan={plan}
            completedNodes={plan.stats.completed}
            totalNodes={plan.stats.total}
            progress={plan.stats.progress}
            stateColors={STATE_COLORS}
            onPlanClick={(id: string) => navigate(`/study-plan/plan/${id}`)}
            onDeleteClick={(e: React.MouseEvent<Element>, id: string) =>
              handleDeletePlan(e, plan.study_plan_id)
            }
            isDeleting={deletingId === plan.study_plan_id}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <DashboardHeader
          title="Study Plan"
          description="현재 진행 중인 나의 학습 계획을 관리하세요"
          onArchiveClick={() => navigate("/study-plan/archive")}
          onCreateClick={() => navigate("/study-plan/create")}
          onCreateAiClick={() => setIsAiModalOpen(true)}
        />

        <ActivePlanSection count={plans.length}>
          {planSectionContent}
        </ActivePlanSection>
      </div>

      {/* AI 학습 계획 생성 모달 */}
      {userId && (
        <AddStudyPlanAiModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onSuccess={() => fetchActivePlans(userId)}
          userId={userId}
          onSubmit={handleGenerateStudyPlan}
        />
      )}
    </div>
  );
}
