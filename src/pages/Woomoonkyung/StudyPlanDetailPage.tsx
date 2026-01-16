import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { WoomoonkyungDetailService } from "../../api/Woomoonkyung/StudyPlanDetailPage";
import { PlanDetail } from "../../types/api/Woomoonkyung/StudyPlanDetailPage";
import BackButton from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/BackButton";
import PlanDetailHeader from "../../components/Woomoonkyung/StudyPlanArchiveDetailPage/PlanDetailHeader";
import MyNodeList from "../../components/Woomoonkyung/StudyPlanArchiveDetailPage/MyNodeList";

export default function StudyPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<PlanDetail | null>(null);

  /**
   * [데이터 로드]
   * 상세 정보와 노드 리스트를 가져옵니다.
   */
  const fetchDetail = useCallback(async () => {
    if (!planId) return;
    try {
      setIsLoading(true);
      const data = await WoomoonkyungDetailService.getPlanWithNodes({ planId });
      setDetail(data);
    } catch (error) {
      console.error(error);
      toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  /**
   * [노드 완료 토글 핸들러]
   * 노드 클릭 시 DB 상태를 업데이트하고 UI를 갱신합니다.
   */
  const handleToggleNode = async (nodeId: string, currentStatus: boolean) => {
    try {
      // 1. 노드 상태 업데이트 API 호출
      await WoomoonkyungDetailService.updateNodeCompletion({
        nodeId,
        isCompleted: !currentStatus,
      });

      // 2. 전체 데이터 다시 불러오기 (통계 및 상태 동기화를 위해)
      await fetchDetail();

      toast.success(
        currentStatus ? "미완료 처리되었습니다." : "완료 처리되었습니다."
      );
    } catch (error) {
      toast.error("상태 변경에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#587CF0]"></div>
      </div>
    );
  }

  if (!detail || !detail.plan) {
    return (
      <div className="p-8 text-center text-gray-600">Study plan not found.</div>
    );
  }

  const { plan, nodes, stats } = detail;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <BackButton label="Back to Archive" to="/Woomoonkyung/archive" />

        <PlanDetailHeader
          planId={planId!}
          name={plan.study_plan_name}
          description={plan.study_plan_description}
          imageUrl={plan.study_plan_image_url}
          startDate={plan.study_plan_start_date}
          endDate={plan.study_plan_end_date}
          state={plan.study_plan_state}
          completedNodes={stats.completedNodesCount}
          totalNodes={stats.totalNodesCount}
          progressPercentage={stats.progressPercentage}
        />

        {/* MyNodeList에 handleToggleNode를 props로 넘겨서 클릭 이벤트를 연결해야 합니다 */}
        <MyNodeList
          nodes={nodes.map((node) => ({
            ...node,
            // UI 컴포넌트 내부 변수명과 DB 필드명이 다를 경우 여기서 매칭
            study_plan_node_id: node.study_plan_node_id,
            study_plan_node_name: node.study_plan_node_name,
            study_plan_node_completed: node.completed, // DB 필드명 completed -> UI props completed 로 매칭
          }))}
          onToggleNode={handleToggleNode}
        />
      </div>
    </div>
  );
}
