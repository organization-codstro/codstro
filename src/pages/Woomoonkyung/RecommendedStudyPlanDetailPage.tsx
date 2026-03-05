import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecommendedStudyPlanDetailService } from "../../api/Woomoonkyung/RecommendedStudyPlanDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";
import BackButton from "../../components/Concepts/BackButton";
import PlanHeader from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/PlanHeader";
import NodeList from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/NodeList";
import { toast } from "react-toastify";
import { StudyPlanNode } from "../../types/common/Woomoonkyung";
import { RecommendedPlan } from "../../types/pages/Woomoonkyung/RecommendedStudyPlansPage/RecommendedStudyPlansPage";
import { RecommendedStudyPlansService } from "../../api/Woomoonkyung/RecommendedStudyPlansPage";

export default function RecommendedStudyPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  /* 상태 관리 (useState) */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [plan, setPlan] = useState<RecommendedPlan | null>(null);
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

        setPlan(planData as RecommendedPlan);
        setNodes(nodesData as StudyPlanNode[]);
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

  const addToMyPlans = async (plan: RecommendedPlan) => {
    if (!userId) {
      toast.warning("로그인이 필요한 기능입니다.");
      return;
    }

    const loadingToast = toast.loading("내 계획에 추가하는 중...");

    try {
      await RecommendedStudyPlansService.addToMyPlans({
        userId,
        targetPlan: {
          study_plan_name: plan.study_plan_name,
          study_plan_description: plan.study_plan_description,
          study_plan_image_url: plan.study_plan_image_url,
          study_plan_end_date: plan.study_plan_end_date,
        },
      });

      toast.update(loadingToast, {
        render: `"${plan.study_plan_name}" 계획이 추가되었습니다!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(loadingToast, {
        render: "계획 추가에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    navigate("/woomoonkyung/recommended");
  };

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
          plan={plan}
          nodeCount={nodes.length}
          state={plan.study_plan_state}
          onAddToMyPlans={() => addToMyPlans(plan)}
        />

        {/* 하위 컴포넌트 Props 전달 */}
        <NodeList nodes={nodes} />
      </div>
    </div>
  );
}
