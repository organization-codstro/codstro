import { useLocation, useNavigate } from "react-router-dom";
import { StudyPlanNode } from "../../types/pages/Woomoonkyung/Woomoonkyung";
import { useEffect, useState } from "react";
import {
  mockPlanInfo,
  mockTechStacks,
} from "../../data/Woomoonkyung/studyPlanNodeData";
import { toast } from "react-toastify";
import { plan } from "../../data/Woomoonkyung/studyPlanData";
import { PlanInfoHeader } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/PlanInfoHeader";
import { CreatePlanButton } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/CreatePlanButton";
import { NodeList } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/NodeList";
import { BackButton } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/BackButton";
import { RightSidebar } from "../../components/Woomoonkyung/StudyPlanCreateNodePage/RightSidebar";
import { ValidationErrors } from "../../types/pages/Woomoonkyung/StudyPlanCreateNodePage/StudyPlanCreateNodePage";

export default function StudyPlanCreateNodePage() {
  const navigate = useNavigate();
  const location = useLocation();

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

  /** 2차 검증 에러 상태 */
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: false,
    startDate: false,
    endDate: false,
  });

  // 에러 개별 초기화 함수
  const clearError = (field: keyof typeof validationErrors) => {
    setValidationErrors((prev) => ({ ...prev, [field]: false }));
  };

  useEffect(() => {
    if (deletePendingNodeId) {
      const timer = setTimeout(() => {
        setDeletePendingNodeId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingNodeId]);

  //api 연결시 uuid 생성
  const nextNodeId = "100";

  const handleAddTechStack = (techStack: (typeof mockTechStacks)[0]) => {
    const newNode: StudyPlanNode = {
      study_plan_node_id: nextNodeId,
      study_plan_id: "1",
      study_plan_node_name: techStack.tech_stack_name,
      description: "",
      start_date: "",
      end_date: "",
      completed: false,
      position: nodes.length + 1,
      tech_stack_id: techStack.tech_stack_id,
      tech_stack_name: techStack.tech_stack_name,
      tech_stack_img_url: techStack.tech_stack_img_url,
      created_date: new Date().toISOString().split("T")[0],
    };

    setNodes((prev) => [...prev, newNode]);
    setEditingNode(newNode);
    setRightSidebarMode("editNode");

    /** 편집 진입 시 검증 초기화 */
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

  const handleNodeClick = (node: StudyPlanNode) => {
    setEditingNode(node);
    setRightSidebarMode("editNode");
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

  /** ✅ 저장 시 2차 검증 */
  const handleSaveEdit = () => {
    if (!editingNode) return;

    const nameError = !editingNode.study_plan_node_name.trim();
    const startDateError = !editingNode.start_date;
    const endDateError = !editingNode.end_date;

    // 하나라도 에러가 있으면 상태 업데이트 후 중단
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
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

  const handleCancelEdit = () => {
    setRightSidebarMode("techStacks");
    setEditingNode(null);
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

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
    } else {
      setDeletePendingNodeId(nodeId);
    }
  };

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

    setNodes(
      newNodes.map((node, idx) => ({
        ...node,
        position: idx + 1,
      }))
    );
    setDraggedItem(index);
  };

  const handleDragEnd = () => setDraggedItem(null);

  const handleCreatePlan = () => {
    console.log("Creating study plan with nodes:", nodes);

    toast.success("공부 계획이 생성되었습니다!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleOutsideClick = () => {
    if (deletePendingNodeId) setDeletePendingNodeId(null);
  };

  const filteredTechStacks = mockTechStacks.filter((techStack) =>
    techStack.tech_stack_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50" onClick={handleOutsideClick}>
      {/* Center Content - Main Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <BackButton
            onClick={() => navigate(`/woomoonkyung/plan/${plan.study_plan_id}`)}
          />

          <PlanInfoHeader planInfo={mockPlanInfo} />

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

      {/* Right Sidebar */}
      <RightSidebar
        mode={rightSidebarMode}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchClear={() => setSearchQuery("")}
        filteredTechStacks={filteredTechStacks}
        onTechStackClick={handleAddTechStack}
        editingNode={editingNode}
        validationErrors={validationErrors}
        onNodeChange={setEditingNode}
        onClearError={clearError}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}
