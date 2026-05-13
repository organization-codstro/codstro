import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { WoomoonkyungEditNodeService } from "../../api/Woomoonkyung/StudyPlanEditNodePage";
import DraggableNodeItem from "../../components/Woomoonkyung/StudyPlanEditNodePage/DraggableNodeItem";
import TechStackPicker from "../../components/Woomoonkyung/StudyPlanEditNodePage/TechStackPicker";
import NodeEditForm from "../../components/Woomoonkyung/StudyPlanEditNodePage/NodeEditForm";
import {
  StudyPlan,
  StudyPlanNode,
  TechStack,
} from "../../types/common/Woomoonkyung";
import NotFoundPage from "../NotFound/NotFoundPage";
import { v4 as uuidv4 } from "uuid";

export default function StudyPlanEditNodePage() {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  // 데이터 상태
  const [planInfo, setPlanInfo] = useState<StudyPlan | null>(null);
  const [nodes, setNodes] = useState<StudyPlanNode[]>([]);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI 상태
  const [rightSidebarMode, setRightSidebarMode] = useState<
    "techStacks" | "editNode"
  >("techStacks");
  const [editingNode, setEditingNode] = useState<StudyPlanNode | null>(null);
  const [deletePendingNodeId, setDeletePendingNodeId] = useState<string | null>(
    null,
  );
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    startDate: false,
    endDate: false,
  });

  /** 1. 초기 데이터 로드 */
  const loadData = useCallback(async () => {
    if (!planId) return;
    try {
      setIsLoading(true);
      const [info, nodeItems, stacks] = await Promise.all([
        WoomoonkyungEditNodeService.getPlanInfo({ planId }),
        WoomoonkyungEditNodeService.getNodesByPlanId({ planId }),
        WoomoonkyungEditNodeService.getTechStacks(),
      ]);

      setPlanInfo(info);
      setNodes(nodeItems as unknown as StudyPlanNode[]);
      setTechStacks(stacks);
    } catch (error) {
      toast.error("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 삭제 대기 해제 타이머
  useEffect(() => {
    if (deletePendingNodeId) {
      const timer = setTimeout(() => setDeletePendingNodeId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingNodeId]);

  /** 2. 노드 추가 (기술 스택 선택 시) */
  const handleAddTechStack = (techStack: TechStack) => {
    const newNode: StudyPlanNode = {
      study_plan_node_id: `temp_${uuidv4()}`,
      study_plan_id: planId!,
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
    setNodes([...nodes, newNode]);
    setEditingNode(newNode);
    setRightSidebarMode("editNode");
  };

  /** 3. 드래그 앤 드롭 순서 변경 */
  const handleDragStart = (e: React.DragEvent, index: number) =>
    setDraggedItem(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    const newNodes = [...nodes];
    const item = newNodes.splice(draggedItem, 1)[0];
    newNodes.splice(index, 0, item);
    setNodes(
      newNodes.map((n, i) => ({ ...n, study_plan_node_position: i + 1 })),
    );
    setDraggedItem(index);
  };

  /** 4. 노드 상세 수정 저장 (로컬 상태 반영) */
  const handleSaveEdit = () => {
    if (!editingNode) return;
    const errors = {
      name: !editingNode.study_plan_node_name.trim(),
      startDate: !editingNode.study_plan_node_start_date,
      endDate: !editingNode.study_plan_node_end_date,
    };
    setValidationErrors(errors);
    if (Object.values(errors).some((v) => v)) return;

    setNodes(
      nodes.map((n) =>
        n.study_plan_node_id === editingNode.study_plan_node_id
          ? editingNode
          : n,
      ),
    );
    setRightSidebarMode("techStacks");
    setEditingNode(null);
  };

  /** 5. 최종 서버 저장 (일괄 저장) */
  const handleFinalSave = async () => {
    try {
      const formattedNodes = nodes.map((n) => ({
        ...n,
        description: n.study_plan_node_description,
        start_date: n.study_plan_node_start_date,
        end_date: n.study_plan_node_end_date,
        completed: n.study_plan_node_completed,
        position: n.study_plan_node_position,
      }));

      await WoomoonkyungEditNodeService.saveAllNodes({
        nodes: formattedNodes as any,
      });
      toast.success("모든 변경사항이 저장되었습니다!");
      navigate(`/woomoonkyung/plan/${planId}`);
    } catch (error) {
      toast.error("저장 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 text-[#587CF0] animate-spin" />
      </div>
    );
  }

  if (!planId) {
    return <NotFoundPage />;
  }

  return (
    <div
      className="flex h-screen bg-gray-50"
      onClick={() => setDeletePendingNodeId(null)}
    >
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#587CF0] font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> 공부 계획으로
          </button>

          {planInfo && (
            <div className="flex items-center gap-4 p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {planInfo.study_plan_name}
                </h1>
                <p className="text-gray-600">
                  {planInfo.study_plan_description}
                </p>
              </div>
            </div>
          )}

          <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
            <h2 className="mb-6 text-lg font-semibold">
              학습 노드 ({nodes.length})
            </h2>
            <div className="space-y-3">
              {nodes.map((node, idx) => (
                <DraggableNodeItem
                  key={node.study_plan_node_id}
                  node={node}
                  index={idx}
                  isDragging={draggedItem === idx}
                  isEditing={
                    editingNode?.study_plan_node_id === node.study_plan_node_id
                  }
                  deletePending={
                    deletePendingNodeId === node.study_plan_node_id
                  }
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={() => setDraggedItem(null)}
                  onClick={() => {
                    setEditingNode(node);
                    setRightSidebarMode("editNode");
                  }}
                  onDeleteClick={async (e, id) => {
                    e.stopPropagation();
                    if (deletePendingNodeId === id) {
                      // 실제 DB 노드인 경우(숫자 형태 ID 등) 서버 삭제 호출
                      if (!String(id).startsWith("temp_")) {
                        // 임시 ID가 아닐 경우
                        await WoomoonkyungEditNodeService.deleteNode({
                          nodeId: id,
                        });
                      }
                      setNodes(
                        nodes
                          .filter((n) => n.study_plan_node_id !== id)
                          .map((n, i) => ({
                            ...n,
                            study_plan_node_position: i + 1,
                          })),
                      );
                      toast.info("노드가 삭제되었습니다.");
                    } else {
                      setDeletePendingNodeId(id);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleFinalSave}
            className="w-full py-4 bg-[#587CF0] text-white rounded-xl font-bold shadow-lg hover:bg-[#4665d1] transition-colors"
          >
            변경사항 저장하기
          </button>
        </div>
      </div>

      <div className="overflow-y-auto bg-white border-l border-purple-100 shadow-xl w-96">
        {rightSidebarMode === "techStacks" ? (
          <TechStackPicker
            techStacks={techStacks.filter((s) =>
              s.tech_stack_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddStack={handleAddTechStack}
          />
        ) : (
          editingNode && (
            <NodeEditForm
              node={editingNode}
              errors={validationErrors}
              onChange={setEditingNode}
              onSave={handleSaveEdit}
              onCancel={() => {
                setRightSidebarMode("techStacks");
                setEditingNode(null);
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
