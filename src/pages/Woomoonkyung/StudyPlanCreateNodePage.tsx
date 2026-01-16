import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PlanInfoHeader } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/PlanInfoHeader";
import { CreatePlanButton } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/CreatePlanButton";
import { NodeList } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/NodeList";
import { BackButton } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/BackButton";
import { RightSidebar } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/RightSidebar";
import {
  StudyPlanNode,
  ValidationErrors,
} from "../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/StudyPlanCreateNodePage";
import { TechStack } from "../../types/api/Woomoonkyung/StudyPlanCreateNodePage";
import { WoomoonkyungCreateNodeService } from "../../api/Woomoonkyung/StudyPlanCreateNodePage";
import { RecommendedStudyPlanDetailService } from "../../api/Woomoonkyung/RecommendedStudyPlanDetailPage";

export default function StudyPlanCreateNodePage() {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  /* 상태 관리 */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [planInfo, setPlanInfo] = useState<any>(null);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [nodes, setNodes] = useState<StudyPlanNode[]>([]);

  const [rightSidebarMode, setRightSidebarMode] = useState<
    "techStacks" | "editNode"
  >("techStacks");
  const [editingNode, setEditingNode] = useState<StudyPlanNode | null>(null);
  const [deletePendingNodeId, setDeletePendingNodeId] = useState<string | null>(
    null
  );
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: false,
    startDate: false,
    endDate: false,
  });

  /** * [초기 데이터 로드]
   * 플랜 정보, 기존 노드 정보, 기술 스택 목록을 가져옵니다.
   */
  const loadInitialData = useCallback(async () => {
    if (!planId) return;
    try {
      setIsLoading(true);
      const [planData, nodesData, techData] = await Promise.all([
        RecommendedStudyPlanDetailService.getStudyPlanById(planId),
        RecommendedStudyPlanDetailService.getNodesByPlanId(planId),
        WoomoonkyungCreateNodeService.getTechStacks(),
      ]);

      setPlanInfo(planData);
      setNodes(nodesData as unknown as StudyPlanNode[]);
      setTechStacks(techData);
    } catch (error) {
      toast.error("데이터 로딩 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  /** [검색 쿼리 변경 시 기술 스택 필터링 API 호출] */
  useEffect(() => {
    const fetchFilteredTech = async () => {
      try {
        const data = await WoomoonkyungCreateNodeService.getTechStacks({
          searchQuery,
        });
        setTechStacks(data);
      } catch (error) {
        console.error(error);
      }
    };
    const timer = setTimeout(fetchFilteredTech, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (deletePendingNodeId) {
      const timer = setTimeout(() => setDeletePendingNodeId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingNodeId]);

  const clearError = (field: keyof typeof validationErrors) => {
    setValidationErrors((prev) => ({ ...prev, [field]: false }));
  };

  /** [노드 추가 핸들러] */
  const handleAddTechStack = (techStack: TechStack) => {
    const newNode: StudyPlanNode = {
      study_plan_node_id: `temp-${Date.now()}`, // 임시 ID (저장 시 DB 생성)
      study_plan_id: planId || "",
      study_plan_node_name: techStack.tech_stack_name,
      study_plan_node_description: "",
      study_plan_node_start_date: "",
      study_plan_node_end_date: "",
      study_plan_node_completed: false,
      study_plan_node_position: nodes.length + 1,
      tech_stack_id: techStack.tech_stack_id,
      tech_stack_name: techStack.tech_stack_name,
      tech_stack_img_url: techStack.tech_stack_img_url,
    };

    setNodes((prev) => [...prev, newNode]);
    setEditingNode(newNode);
    setRightSidebarMode("editNode");
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

  const handleNodeClick = (node: StudyPlanNode) => {
    setEditingNode(node);
    setRightSidebarMode("editNode");
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

  /** [편집 저장 핸들러] */
  const handleSaveEdit = () => {
    if (!editingNode) return;

    const nameError = !editingNode.study_plan_node_name.trim();
    const startDateError = !editingNode.study_plan_node_start_date;
    const endDateError = !editingNode.study_plan_node_end_date;

    if (nameError || startDateError || endDateError) {
      setValidationErrors({
        name: nameError,
        startDate: startDateError,
        endDate: endDateError,
      });
      return;
    }

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.study_plan_node_id === editingNode.study_plan_node_id
          ? editingNode
          : node
      )
    );

    setRightSidebarMode("techStacks");
    setEditingNode(null);
  };

  /** [삭제 핸들러 (2단계 확정)] */
  const handleDeleteClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();

    if (deletePendingNodeId === nodeId) {
      setNodes((prevNodes) =>
        prevNodes
          .filter((n) => n.study_plan_node_id !== nodeId)
          .map((node, index) => ({ ...node, position: index + 1 }))
      );
      setDeletePendingNodeId(null);

      if (editingNode?.study_plan_node_id === nodeId) {
        setRightSidebarMode("techStacks");
        setEditingNode(null);
      }
      toast.info(
        "노드가 목록에서 제거되었습니다. '생성하기'를 눌러 저장하세요."
      );
    } else {
      setDeletePendingNodeId(nodeId);
    }
  };

  /* Drag & Drop 로직 */
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newNodes = [...nodes];
    const draggedNode = newNodes[draggedItem];
    newNodes.splice(draggedItem, 1);
    newNodes.splice(index, 0, draggedNode);

    setNodes(newNodes.map((node, idx) => ({ ...node, position: idx + 1 })));
    setDraggedItem(index);
  };

  const handleDragEnd = () => setDraggedItem(null);

  /** * [최종 저장 핸들러]
   * 로컬에서 구성한 모든 노드를 Supabase에 일괄 저장합니다.
   */
  const handleCreatePlan = async () => {
    if (!planId) return;

    const loadingToast = toast.loading("공부 계획 노드를 저장 중입니다...");
    try {
      await WoomoonkyungCreateNodeService.saveAllNodes({
        planId,
        nodes: nodes.map((n) => ({
          ...n,
          // 임시 ID인 경우 Supabase에서 자동 생성하도록 함
          study_plan_node_id: n.study_plan_node_id.startsWith("temp-")
            ? undefined
            : n.study_plan_node_id,
        })) as any,
      });

      toast.update(loadingToast, {
        render: "공부 계획이 성공적으로 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate(`/woomoonkyung/plan/${planId}`);
    } catch (error) {
      toast.update(loadingToast, {
        render: "계획 저장 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div
      className="flex h-screen bg-gray-50"
      onClick={() => deletePendingNodeId && setDeletePendingNodeId(null)}
    >
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <BackButton
            onClick={() => navigate(`/woomoonkyung/plan/${planId}`)}
          />

          <PlanInfoHeader planInfo={planInfo} />

          <NodeList
            nodes={nodes}
            draggedItem={draggedItem}
            editingNode={editingNode}
            deletePendingNodeId={deletePendingNodeId}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onNodeClick={handleNodeClick}
            onDeleteClick={handleDeleteClick}
          />

          <CreatePlanButton
            onClick={handleCreatePlan}
            nodeCount={nodes.length}
            disabled={nodes.length === 0}
          />
        </div>
      </div>

      <RightSidebar
        mode={rightSidebarMode}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchClear={() => setSearchQuery("")}
        filteredTechStacks={techStacks}
        onTechStackClick={handleAddTechStack}
        editingNode={editingNode}
        validationErrors={validationErrors}
        onNodeChange={setEditingNode}
        onClearError={clearError}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={() => {
          setRightSidebarMode("techStacks");
          setEditingNode(null);
        }}
      />
    </div>
  );
}
