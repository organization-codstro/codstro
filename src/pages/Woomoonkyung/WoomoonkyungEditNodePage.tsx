import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { StudyPlanNode } from "../../types/Woomoonkyung/StudyPlanNode";
import {
  mockPlanInfo,
  mockTechStacks,
  existingNodes,
} from "../../data/Woomoonkyung/studyPlanNodeData";
import DraggableNodeItem from "../../components/Woomoonkyung/WoomoonkyungEditNodePage/DraggableNodeItem";
import TechStackPicker from "../../components/Woomoonkyung/WoomoonkyungEditNodePage/TechStackPicker";
import NodeEditForm from "../../components/Woomoonkyung/WoomoonkyungEditNodePage/NodeEditForm";

const WoomoonkyungEditNode: React.FC = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<StudyPlanNode[]>(existingNodes);
  const [rightSidebarMode, setRightSidebarMode] = useState<
    "techStacks" | "editNode"
  >("techStacks");
  const [editingNode, setEditingNode] = useState<StudyPlanNode | null>(null);
  const [deletePendingNodeId, setDeletePendingNodeId] = useState<number | null>(
    null
  );
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    startDate: false,
    endDate: false,
  });

  // 삭제 대기 해제 타이머
  useEffect(() => {
    if (deletePendingNodeId) {
      const timer = setTimeout(() => setDeletePendingNodeId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingNodeId]);

  // 핸들러 함수들 (DND, 삭제, 저장 등 기존 로직 유지)
  const handleAddTechStack = (techStack: any) => {
    const newNode: StudyPlanNode = {
      study_plan_node_id: Date.now(),
      study_plan_id: mockPlanInfo.study_plan_id,
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
    setNodes([...nodes, newNode]);
    setEditingNode(newNode);
    setRightSidebarMode("editNode");
  };

  const handleDragStart = (e: React.DragEvent, index: number) =>
    setDraggedItem(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    const newNodes = [...nodes];
    const item = newNodes.splice(draggedItem, 1)[0];
    newNodes.splice(index, 0, item);
    setNodes(newNodes.map((n, i) => ({ ...n, position: i + 1 })));
    setDraggedItem(index);
  };

  const handleSaveEdit = () => {
    if (!editingNode) return;
    const errors = {
      name: !editingNode.study_plan_node_name.trim(),
      startDate: !editingNode.start_date,
      endDate: !editingNode.end_date,
    };
    setValidationErrors(errors);
    if (Object.values(errors).some((v) => v)) return;

    setNodes(
      nodes.map((n) =>
        n.study_plan_node_id === editingNode.study_plan_node_id
          ? editingNode
          : n
      )
    );
    setRightSidebarMode("techStacks");
    setEditingNode(null);
  };

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

          <div className="flex items-center gap-4 p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-[#587CF0] to-purple-400 rounded-lg flex items-center justify-center text-white">
              <FileText />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {mockPlanInfo.study_plan_name}
              </h1>
              <p className="text-gray-600">
                {mockPlanInfo.study_plan_description}
              </p>
            </div>
          </div>

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
                  onDeleteClick={(e, id) => {
                    e.stopPropagation();
                    if (deletePendingNodeId === id)
                      setNodes(
                        nodes
                          .filter((n) => n.study_plan_node_id !== id)
                          .map((n, i) => ({ ...n, position: i + 1 }))
                      );
                    else setDeletePendingNodeId(id);
                  }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => toast.success("저장되었습니다!")}
            className="w-full py-4 bg-[#587CF0] text-white rounded-xl font-bold shadow-lg"
          >
            공부 계획 생성
          </button>
        </div>
      </div>

      <div className="overflow-y-auto bg-white border-l border-purple-100 shadow-xl w-96">
        {rightSidebarMode === "techStacks" ? (
          <TechStackPicker
            techStacks={mockTechStacks.filter((s) =>
              s.tech_stack_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
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
};

export default WoomoonkyungEditNode;
