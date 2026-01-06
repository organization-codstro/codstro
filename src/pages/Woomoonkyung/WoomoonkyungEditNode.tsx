import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  GripVertical,
  Trash2,
  Plus,
  Calendar,
  FileText,
  X,
  Search,
} from "lucide-react";
import { StudyPlanNode } from "../../types/Woomoonkyung/StudyPlanNode";
import {
  mockPlanInfo,
  mockTechStacks,
} from "../../data/Woomoonkyung/studyPlanNodeData";
//예시 데이터
import { plan } from "../../data/Woomoonkyung/studyPlanData";
import { existingNodes } from "../../data/Woomoonkyung/studyPlanNodeData";
import { toast } from "react-toastify";

const WoomoonkyungEditNode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 상태 관리
  const [nodes, setNodes] = useState<StudyPlanNode[]>(existingNodes);
  const [rightSidebarMode, setRightSidebarMode] = useState<
    "techStacks" | "editNode"
  >("techStacks");
  const [editingNode, setEditingNode] = useState<StudyPlanNode | null>(null);
  const [deletePendingNodeId, setDeletePendingNodeId] = useState<number | null>(
    null
  );
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [validationErrors, setValidationErrors] = useState<{
    name: boolean;
    startDate: boolean;
    endDate: boolean;
  }>({
    name: false,
    startDate: false,
    endDate: false,
  });

  // 에러 개별 초기화 함수
  const clearError = (field: keyof typeof validationErrors) => {
    setValidationErrors((prev) => ({ ...prev, [field]: false }));
  };

  // 삭제 대기 상태 자동 해제 (3초)
  useEffect(() => {
    if (deletePendingNodeId) {
      const timer = setTimeout(() => {
        setDeletePendingNodeId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingNodeId]);

  const nextNodeId =
    nodes.length > 0
      ? Math.max(...nodes.map((n) => n.study_plan_node_id)) + 1
      : 1;

  // Tech Stack 추가 → 노드 생성 및 편집 모드 전환
  const handleAddTechStack = (techStack: (typeof mockTechStacks)[0]) => {
    const newNode: StudyPlanNode = {
      study_plan_node_id: nextNodeId,
      study_plan_id: 1,
      study_plan_node_name: techStack.tech_stack_name,
      description: "",
      start_date: "",
      end_date: "",
      completed: false,
      position: nodes.length + 1,
      tech_stack_id: techStack.tech_stack_id,
      tech_stack_name: techStack.tech_stack_name,
      tech_stack_img_url: techStack.tech_stack_img_url,
      created_date: "2020-10-02",
    };

    setNodes([...nodes, newNode]);
    setEditingNode(newNode);
    setRightSidebarMode("editNode");
  };

  // 노드 클릭 → 편집 모드
  const handleNodeClick = (node: StudyPlanNode) => {
    setEditingNode(node);
    setRightSidebarMode("editNode");
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

  // 노드 편집 저장
  const handleSaveEdit = () => {
    if (!editingNode) return;

    // ✅ 필수 값 검증 (이름, 시작일, 종료일)
    const nameError = !editingNode.study_plan_node_name.trim();
    const startDateError = !editingNode.start_date;
    const endDateError = !editingNode.end_date;

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

  // 편집 취소
  const handleCancelEdit = () => {
    setRightSidebarMode("techStacks");
    setEditingNode(null);
    setValidationErrors({ name: false, startDate: false, endDate: false });
  };

  // 삭제 처리 (2단계: 첫 클릭 → 빨간색, 두 번째 클릭 → 삭제)
  const handleDeleteClick = (e: React.MouseEvent, nodeId: number) => {
    e.stopPropagation(); // 노드 클릭 이벤트 방지

    if (deletePendingNodeId === nodeId) {
      // 두 번째 클릭 → 실제 삭제
      setNodes((prevNodes) => {
        const filtered = prevNodes.filter(
          (n) => n.study_plan_node_id !== Number(nodeId)
        );
        // position 재조정
        return filtered.map((node, index) => ({
          ...node,
          position: index + 1,
        }));
      });
      setDeletePendingNodeId(null);

      // 편집 중인 노드가 삭제된 경우
      if (editingNode?.study_plan_node_id === Number(nodeId)) {
        setRightSidebarMode("techStacks");
        setEditingNode(null);
      }
    } else {
      // 첫 번째 클릭 → 삭제 대기 상태
      setDeletePendingNodeId(nodeId);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggedItem === null || draggedItem === index) return;

    const newNodes = [...nodes];
    const draggedNode = newNodes[draggedItem];
    newNodes.splice(draggedItem, 1);
    newNodes.splice(index, 0, draggedNode);

    // position 업데이트
    const updatedNodes = newNodes.map((node, idx) => ({
      ...node,
      position: idx + 1,
    }));

    setNodes(updatedNodes);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // 공부 계획 생성
  const handleCreatePlan = () => {
    // TODO: 서버에 저장
    console.log("Creating study plan with nodes:", nodes);

    toast.success("공부 계획이 생성되었습니다!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // 다른 곳 클릭 시 삭제 대기 상태 해제
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (deletePendingNodeId) {
      setDeletePendingNodeId(null);
    }
  };

  // Tech Stack 검색 필터링
  const filteredTechStacks = mockTechStacks.filter((techStack) =>
    techStack.tech_stack_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50" onClick={handleOutsideClick}>
      {/* Center Content - Main Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/woomoonkyung/plan/${plan.study_plan_id}`)}
            className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            공부 계획으로
          </button>

          {/* Plan Info Header */}
          <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#587CF0] to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                  {mockPlanInfo.study_plan_name}
                </h1>
                <p className="text-gray-600">
                  {mockPlanInfo.study_plan_description}
                </p>
              </div>
            </div>
          </div>

          {/* Current Nodes */}
          <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                학습 노드 ({nodes.length})
              </h2>
            </div>

            {nodes.length === 0 ? (
              // 빈 상태 메시지
              <div className="py-16 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
                  <Plus className="w-8 h-8 text-[#587CF0]" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  아직 추가된 노드가 없습니다
                </h3>
                <p className="text-gray-600">
                  우측 Tech Stacks에서 선택하여 학습 노드를 추가하세요
                </p>
              </div>
            ) : (
              // 노드 리스트
              <div className="space-y-3">
                {nodes.map((node, index) => (
                  <div
                    key={node.study_plan_node_id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleNodeClick(node)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      draggedItem === index ? "opacity-50 scale-95" : ""
                    } ${
                      editingNode?.study_plan_node_id ===
                      node.study_plan_node_id
                        ? "border-[#587CF0] bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Drag Handle */}
                      <div
                        className="cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <GripVertical className="w-5 h-5 text-gray-400" />
                      </div>

                      {/* Position Badge */}
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#587CF0] text-white text-sm font-medium flex-shrink-0">
                        {node.position}
                      </div>

                      {/* Tech Stack Image */}
                      <div className="flex-shrink-0 w-10 h-10 p-1 bg-white rounded-lg">
                        <img
                          src={node.tech_stack_img_url}
                          alt={node.tech_stack_name}
                          className="object-contain w-full h-full"
                        />
                      </div>

                      {/* Node Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-1 font-semibold text-gray-800">
                          {node.study_plan_node_name}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">
                          {node.description || "설명이 없습니다"}
                        </p>
                        {node.start_date && node.end_date && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(node.start_date).toLocaleDateString()} -{" "}
                              {new Date(node.end_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Delete Button - 2단계 삭제 */}
                      <button
                        onClick={(e) =>
                          handleDeleteClick(e, node.study_plan_node_id)
                        }
                        className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                          deletePendingNodeId === node.study_plan_node_id
                            ? "bg-red-500 text-white hover:bg-red-600 shadow-md scale-110"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        title={
                          deletePendingNodeId === node.study_plan_node_id
                            ? "다시 클릭하여 삭제"
                            : "삭제"
                        }
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreatePlan}
            disabled={nodes.length === 0}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              nodes.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#587CF0] hover:bg-[#4a6de8] shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            }`}
          >
            공부 계획 생성 ({nodes.length}개 노드)
          </button>
        </div>
      </div>

      {/* Right Sidebar - Tech Stacks or Edit Form */}
      <div className="flex-shrink-0 overflow-y-auto bg-white border-l border-purple-100 shadow-lg w-96">
        {rightSidebarMode === "techStacks" ? (
          // Tech Stacks 선택 화면
          <div className="p-6">
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Tech Stacks
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                학습하고 싶은 기술 스택을 선택하세요
              </p>

              {/* 검색창 */}
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tech Stack 검색..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {filteredTechStacks.length === 0 ? (
              // 검색 결과 없음
              <div className="py-12 text-center">
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">
                  '{searchQuery}'에 대한 결과가 없습니다
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredTechStacks.map((techStack) => (
                  <button
                    key={techStack.tech_stack_id}
                    onClick={() => handleAddTechStack(techStack)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#587CF0] hover:bg-blue-50 transition-all duration-200 group hover:shadow-md transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center p-2 mb-3 bg-white rounded-lg aspect-square">
                      <img
                        src={techStack.tech_stack_img_url}
                        alt={techStack.tech_stack_name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-800 text-center group-hover:text-[#587CF0] transition-colors">
                      {techStack.tech_stack_name}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          // 노드 편집 폼
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">노드 편집</h2>
              <button
                onClick={handleCancelEdit}
                className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editingNode && (
              <div className="space-y-5">
                {/* Tech Stack Info (읽기 전용) */}
                <div className="p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 p-2 bg-white rounded-lg shadow-sm">
                      <img
                        src={editingNode.tech_stack_img_url}
                        alt={editingNode.tech_stack_name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-500">
                        기반 Tech Stack
                      </p>
                      <p className="font-semibold text-gray-800">
                        {editingNode.tech_stack_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Node Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    노드 이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingNode.study_plan_node_name}
                    onChange={(e) => {
                      setEditingNode({
                        ...editingNode,
                        study_plan_node_name: e.target.value,
                      });
                      clearError("name");
                    }}
                    placeholder="예: JavaScript 기초"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                      validationErrors.name
                        ? "border-red-500 bg-red-50 focus:ring-red-100"
                        : "border-gray-300 focus:ring-2 focus:ring-[#587CF0]"
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      노드 이름을 입력해 주세요.
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    설명
                  </label>
                  <textarea
                    value={editingNode.description}
                    onChange={(e) =>
                      setEditingNode({
                        ...editingNode,
                        description: e.target.value,
                      })
                    }
                    placeholder="학습 내용을 상세하게 설명하세요"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent resize-none transition-all"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    시작일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={editingNode.start_date}
                    onChange={(e) => {
                      setEditingNode({
                        ...editingNode,
                        start_date: e.target.value,
                      });
                      clearError("startDate");
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                      validationErrors.startDate
                        ? "border-red-500 bg-red-50 focus:ring-red-100"
                        : "border-gray-300 focus:ring-2 focus:ring-[#587CF0]"
                    }`}
                  />
                  {validationErrors.startDate && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      시작일을 선택해 주세요.
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    종료일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={editingNode.end_date}
                    onChange={(e) => {
                      setEditingNode({
                        ...editingNode,
                        end_date: e.target.value,
                      });
                      clearError("endDate");
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                      validationErrors.endDate
                        ? "border-red-500 bg-red-50 focus:ring-red-100"
                        : "border-gray-300 focus:ring-2 focus:ring-[#587CF0]"
                    }`}
                  />
                  {validationErrors.endDate && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      종료일을 선택해 주세요.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleSaveEdit}
                    className="w-full py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-all font-semibold shadow-md"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="w-full py-3 font-medium text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WoomoonkyungEditNode;
