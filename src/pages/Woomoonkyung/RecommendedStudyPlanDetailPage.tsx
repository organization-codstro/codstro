import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecommendedStudyPlanDetailService } from "../../api/Woomoonkyung/RecommendedStudyPlanDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";
import BackButton from "../../components/Concepts/BackButton";
import PlanHeader from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/PlanHeader";
import NodeList from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/NodeList";
import { toast } from "react-toastify";
import {
  StudyPlan,
  StudyPlanNode,
} from "../../types/pages/Woomoonkyung/RecommendedStudyPlanDetailPage/RecommendedStudyPlanDetailPage";

export default function RecommendedStudyPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();

  /* 상태 관리 (useState) */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [nodes, setNodes] = useState<StudyPlanNode[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * [데이터 로드 로직]
   * 유저 ID 확보 후 API 서비스를 호출하여 플랜 및 노드 정보를 가져옴
   */
  useEffect(() => {
    const fetchData = async () => {
      if (!planId) {
        setError("유효하지 않은 접근입니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // 1. 유저 ID 가져오기
        const currentUserId = await LoginService.getCurrentUserId();
        setUserId(currentUserId);

        // 2. 플랜 상세 및 노드 리스트 병렬 호출
        const [planData, nodesData] = await Promise.all([
          RecommendedStudyPlanDetailService.getStudyPlanById(planId),
          RecommendedStudyPlanDetailService.getNodesByPlanId(planId),
        ]);

        setPlan(planData as unknown as StudyPlan);
        setNodes(nodesData as unknown as StudyPlanNode[]);
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        toast.error("데이터 로드 실패");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [planId]);

  /* 상세 페이지 예외 처리 (ID가 없는 경우) */
  if (!planId) {
    return (
      <div className="p-8 text-center text-red-500">
        잘못된 경로입니다. 플랜 ID를 확인해주세요.
      </div>
    );
  }

  /* 로딩 상태 UX 처리 */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">
          데이터를 불러오는 중...
        </div>
      </div>
    );
  }

  /* 데이터가 없는 경우 EmptyState 처리 */
  if (error || !plan) {
    return (
      <div className="p-8 text-center text-gray-600">
        {error || "해당 공부 계획을 찾을 수 없습니다."}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <BackButton
          label="Back to Recommended Plans"
          to="/woomoonkyung/recommended"
        />

        {/* 컬럼명 일치: UI와 서비스 코드 데이터 매칭 */}
        <PlanHeader
          name={plan.study_plan_name}
          description={plan.study_plan_description}
          imageUrl={plan.study_plans_image_url}
          startDate={plan.study_plans_start_date}
          endDate={plan.study_plans_end_date}
          nodeCount={nodes.length}
          state={plan.study_plans_state}
          isBookmarked={plan.study_plans_is_archived}
        />

        {/* 하위 컴포넌트 Props 전달 */}
        <NodeList nodes={nodes} />
      </div>
    </div>
  );
}
