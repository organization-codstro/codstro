import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit3,
  Target,
  Trash2,
} from "lucide-react";
import { StudyPlanArchiveDetailService } from "../../api/Woomoonkyung/StudyPlanArchiveDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { StudyPlan, StudyPlanNode } from "../../types/common/Woomoonkyung";
import NotFoundPage from "../NotFound/NotFoundPage";
import { STATE_COLORS } from "../../constants/Woomoonkyung/Woomoonkyung";

export default function StudyPlanArchiveDetailPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  /* 상태 관리 (useState) */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [nodes, setNodes] = useState<StudyPlanNode[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // 2단계 삭제용

  /**
   * [데이터 로드]
   * 페이지 진입 시 유저 ID 확인 및 상세 정보/노드 리스트 확보
   */
  const fetchData = useCallback(async () => {
    if (!planId) {
      return;
    }

    try {
      setIsLoading(true);
      const currentUserId = await LoginService.getCurrentUserId();
      if (!currentUserId) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const [planData, nodesData] = await Promise.all([
        StudyPlanArchiveDetailService.getPlanDetail(planId),
        StudyPlanArchiveDetailService.getPlanNodes(planId),
      ]);

      setPlan(planData as unknown as StudyPlan);
      setNodes(nodesData as unknown as StudyPlanNode[]);
    } catch (error) {
      toast.error("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * [노드 완료 토글 핸들러]
   * 노드 상태 변경 후 부모 플랜의 상태를 자동 동기화(Service 로직 활용)
   */
  const handleToggleNode = async (currentStatus: boolean, nodeId?: string) => {
    if (!planId || !nodeId) return;

    try {
      const result =
        await StudyPlanArchiveDetailService.toggleNodeAndSyncStatus({
          planId,
          nodeId,
          completed: !currentStatus,
        });

      // UI 상태 업데이트
      setNodes((prev) =>
        prev.map((n) =>
          n.study_plan_node_id === nodeId
            ? { ...n, completed: !currentStatus }
            : n,
        ),
      );
      if (result.updatedPlan) {
        setPlan(result.updatedPlan as unknown as StudyPlan);
      }
      toast.success(
        currentStatus ? "미완료 처리되었습니다." : "완료 처리되었습니다.",
      );
    } catch (error) {
      toast.error("상태 변경 중 오류가 발생했습니다.");
    }
  };

  /**
   * [삭제 로직 (Pending UI)]
   * 유저 실수를 방지하기 위한 2단계 확정 방식
   */
  const handleDeletePlan = async () => {
    if (!planId) return;

    if (!isDeleting) {
      setIsDeleting(true);
      toast.info("한 번 더 클릭하면 삭제됩니다. (3초 후 취소)", {
        autoClose: 500,
      });
      setTimeout(() => setIsDeleting(false), 500);
      return;
    }

    try {
      await StudyPlanArchiveDetailService.deletePlan(planId);
      toast.success("계획이 삭제되었습니다.");
      navigate("/Woomoonkyung/archive");
    } catch (error) {
      toast.error("삭제 실패");
    }
  };

  /* 계산된 변수 (진행률) */
  const completedNodes = nodes.filter(
    (node) => node.study_plan_node_completed,
  ).length;
  const totalNodes = nodes.length;
  const progressPercentage =
    totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!plan) return <NotFoundPage />;

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/Woomoonkyung/archive")}
            className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Archive
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/woomoonkyung/edit/${planId}`)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 transition-colors bg-white border rounded-lg hover:bg-gray-50"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDeletePlan}
              className={`flex items-center gap-2 px-3 py-1 text-sm transition-all border rounded-lg ${
                isDeleting
                  ? "bg-red-500 text-white border-red-500 animate-pulse"
                  : "bg-white text-red-500 border-red-200 hover:bg-red-50"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Confirm Delete" : "Delete"}
            </button>
          </div>
        </div>

        {/* Plan Header */}
        <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
          {plan.study_plan_image_url && (
            <div className="h-48 overflow-hidden bg-gray-200">
              <img
                src={plan.study_plan_image_url}
                alt={plan.study_plan_name}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                  {plan.study_plan_name}
                </h1>
                <p className="mb-4 text-gray-600">
                  {plan.study_plan_description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(
                        plan.study_plan_start_date,
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(plan.study_plan_end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>
                      {completedNodes}/{totalNodes} nodes completed
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full border ${
                    STATE_COLORS[plan.study_plan_state] ||
                    "border-gray-200 text-gray-500"
                  }`}
                >
                  {plan.study_plan_state}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="bg-[#587CF0] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Plan Nodes */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">
            Study Plan Nodes
          </h3>

          <div className="space-y-4">
            {nodes.map((node) => (
              <div
                key={node.study_plan_node_id}
                onClick={() =>
                  handleToggleNode(
                    node.study_plan_node_completed,
                    node.study_plan_node_id,
                  )
                }
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  node.study_plan_node_completed
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-white hover:border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1 gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#587CF0] text-white text-sm font-medium">
                      {node.study_plan_node_position}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold text-gray-800 mb-2 ${
                          node.study_plan_node_completed
                            ? "line-through text-gray-500"
                            : ""
                        }`}
                      >
                        {node.study_plan_node_name}
                      </h4>
                      <p
                        className={`text-sm text-gray-600 mb-3 ${
                          node.study_plan_node_completed ? "line-through" : ""
                        }`}
                      >
                        {node.study_plan_node_description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(
                              node.study_plan_node_start_date,
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              node.study_plan_node_end_date,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {node.study_plan_node_completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {nodes.length === 0 && (
            <div className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                No study nodes yet
              </h3>
              <p className="text-gray-600">
                This study plan doesn't have any nodes configured yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
