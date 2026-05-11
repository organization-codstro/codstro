import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { WoomoonkyungDetailService } from "../../api/Woomoonkyung/StudyPlanDetailPage"; // 경로 확인 필요3
import BackButton from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/BackButton";
import PlanDetailHeader from "../../components/Woomoonkyung/StudyPlanArchiveDetailPage/PlanDetailHeader";
import MyNodeList from "../../components/Woomoonkyung/StudyPlanArchiveDetailPage/MyNodeList";
import { StudyPlanWithNodes } from "../../types/common/Woomoonkyung";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function StudyPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<StudyPlanWithNodes | null>(null);

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
        currentStatus ? "미완료 처리되었습니다." : "완료 처리되었습니다.",
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

  if (!detail || !planId) {
    return <NotFoundPage />;
  }

  const { plan, nodes, stats } = detail;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <BackButton label="Back to Archive" to="/Woomoonkyung" />

        <PlanDetailHeader
          planId={planId}
          name={plan.title}
          description={plan.description}
          imageUrl={plan.imageUrl}
          startDate={plan.startDate}
          endDate={plan.endDate}
          state={plan.state}
          completedNodes={stats.completedNodesCount}
          totalNodes={stats.totalNodesCount}
          progressPercentage={stats.progressPercentage}
        />

        <MyNodeList
          nodes={nodes.map((node) => ({
            // 1. 기존 데이터 전개
            ...node,
            // 2. StudyPlanNode 인터페이스의 필수 필드들을 API 데이터 필드와 매칭
            study_plan_node_id: node.study_plan_node_id,
            study_plan_node_name: node.study_plan_node_name,
            study_plan_node_completed: node.study_plan_node_completed, // DB: completed -> UI: study_plan_node_completed

            // 오류에서 지적한 누락된 필수 필드들을 매칭
            study_plan_node_description: node.study_plan_node_description || "",
            study_plan_node_position: node.study_plan_node_position,
            study_plan_node_start_date: node.study_plan_node_start_date || "",
            study_plan_node_end_date: node.study_plan_node_end_date || "",

            // tech_stack 관련 정보가 API node 내부에 있다면 매칭, 없다면 빈 값 처리
            tech_stack_id: node.tech_stack_id || "",
          }))}
          onToggleNode={handleToggleNode}
          planId={planId}
        />
      </div>
    </div>
  );
}
