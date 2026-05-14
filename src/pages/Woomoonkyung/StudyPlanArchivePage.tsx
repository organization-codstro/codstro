import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Archive, Search } from "lucide-react";
import { StudyPlanArchiveService } from "../../api/Woomoonkyung/StudyPlanArchivePage";
import { LoginService } from "../../api/Auth/LoginPage";
import ArchiveStudyPlanCard from "../../components/Woomoonkyung/StudyPlanArchivePage/ArchiveStudyPlanCard";
import { toast } from "react-toastify";
import { PlanStatsResult, StudyPlan } from "../../types/common/Woomoonkyung";
import { STATE_COLORS } from "../../constants/Woomoonkyung/Woomoonkyung";

export default function StudyPlanArchivePage() {
  const navigate = useNavigate();

  /* 상태 관리 (useState) */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [archivedPlans, setArchivedPlans] = useState<StudyPlan[]>([]);
  const [planStatsMap, setPlanStatsMap] = useState<
    Record<string, PlanStatsResult>
  >({});
  const [deletingId, setDeletingId] = useState<string | null>(null); // 2단계 삭제용

  /**
   * [데이터 로드 로직]
   * 유저 ID 확보 후 아카이브 목록과 각 계획의 상세 통계를 가져옴
   */
  const fetchArchivedData = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUserId = await LoginService.getCurrentUserId();
      if (!currentUserId) {
        setIsLoading(false);
        return;
      }
      setUserId(currentUserId);

      // 1. 아카이브 목록 조회
      const plans = await StudyPlanArchiveService.getArchivedPlans({
        userId: currentUserId,
        searchQuery,
      });
      setArchivedPlans(plans as StudyPlan[]);

      // 2. 각 플랜별 통계 조회 (병렬 처리)
      const statsPromises = plans.map((plan) =>
        StudyPlanArchiveService.getPlanStats({ planId: plan.study_plan_id }),
      );
      const statsResults = await Promise.all(statsPromises);

      const newStatsMap: Record<string, PlanStatsResult> = {};
      plans.forEach((plan, index) => {
        newStatsMap[plan.study_plan_id] = statsResults[index];
      });
      setPlanStatsMap(newStatsMap);
    } catch (error) {
      console.error(error);
      toast.error("아카이브 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchArchivedData();
  }, [fetchArchivedData]);

  /**
   * [삭제 핸들러 (Pending UI)]
   * 추천 계획은 보관 해제, 일반 계획은 영구 삭제 처리 (3초 타이머 포함)
   */
  const handleDeletePlan = async (e: React.MouseEvent, plan: StudyPlan) => {
    e.stopPropagation();

    if (deletingId !== plan.study_plan_id) {
      setDeletingId(plan.study_plan_id);
      setTimeout(() => setDeletingId(null), 3000);
      return;
    }

    try {
      await StudyPlanArchiveService.deleteFromArchive({
        planId: plan.study_plan_id,
      });

      setArchivedPlans((prev) =>
        prev.filter((p) => p.study_plan_id !== plan.study_plan_id),
      );
      toast.success(
        plan.study_plan_is_recommendation
          ? "보관함에서 제외되었습니다."
          : "공부 계획이 삭제되었습니다.",
      );
    } catch (error) {
      toast.error("처리에 실패했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
              <Archive className="text-[#587CF0]" />
              Study Plans Archive
            </h1>
            <p className="text-gray-600">
              완료된 내 계획 또는 보관된 추천 계획을 확인하세요
            </p>
          </div>

          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search archived plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none bg-white transition-all w-64"
            />
          </div>
        </div>

        {/* Archived Plans List */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            Archived Plans ({archivedPlans.length})
          </h2>

          {isLoading ? (
            <div className="py-20 text-center text-gray-500">
              데이터를 불러오는 중...
            </div>
          ) : archivedPlans.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {archivedPlans.map((plan) => {
                const stats = planStatsMap[plan.study_plan_id] || {
                  total: 0,
                  completed: 0,
                  progress: 0,
                };

                return (
                  <ArchiveStudyPlanCard
                    key={plan.study_plan_id}
                    plan={{
                      ...plan,

                      study_plan_image_url: plan.study_plan_image_url,
                      study_plan_state: plan.study_plan_state,
                    }}
                    completedNodes={stats.completed}
                    totalNodes={stats.total}
                    progress={stats.progress}
                    stateColors={STATE_COLORS}
                    onPlanClick={(id) => navigate(`/woomoonkyung/plan/${id}`)}
                    onDeleteClick={(e) => handleDeletePlan(e, plan)}
                    isDeleting={deletingId === plan.study_plan_id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Archive className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                보관된 계획이 없습니다
              </h3>
              <p className="text-gray-600">
                계획을 완료하거나 추천 계획을 북마크해보세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
