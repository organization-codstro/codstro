import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit3,
  Target,
  X,
  GripVertical,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  stateColors,
  studyPlanNodes,
  studyPlans,
} from "../../data/Woomoonkyung/woomoonkyungData";
import { StudyPlan } from "../../types/Woomoonkyung/StudyPlanNode";

const WoomoonkyungDetail = () => {
  const { planId } = useParams<{ planId: string }>();
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [nodes, setNodes] = useState<any[]>(studyPlanNodes);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<any>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const navigate = useNavigate();

  const plan = studyPlans.find((p) => p.study_plan_id === Number(planId));
  const completedNodes = nodes.filter((node) => node.completed).length;
  const totalNodes = nodes.length;
  const progressPercentage =
    totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;

  useEffect(() => {
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [plan]);

  // 완료 상태 토글
  const toggleNodeCompletion = (nodeId: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.study_plan_node_id === nodeId
          ? { ...node, completed: !node.completed }
          : node
      )
    );
  };

  // 수정 모달 열기
  const openEditModal = (node: any) => {
    setEditingNode({ ...node });
    setIsEditModalOpen(true);
  };

  // 노드 수정 저장
  const saveNodeEdit = () => {
    if (editingNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.study_plan_node_id === editingNode.study_plan_node_id
            ? editingNode
            : node
        )
      );
      setIsEditModalOpen(false);
      setEditingNode(null);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
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

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/woomoonkyung")}
          className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Study Plans
        </button>

        {/* Plan Header */}
        <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
          {selectedPlan.study_plans_image_url && (
            <div className="h-48 overflow-hidden bg-gray-200">
              <img
                src={selectedPlan.study_plans_image_url}
                alt={selectedPlan.study_plan_name}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                  {selectedPlan.study_plan_name}
                </h1>
                <p className="mb-4 text-gray-600">
                  {selectedPlan.study_plan_description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(
                        selectedPlan.study_plans_start_date
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        selectedPlan.study_plans_end_date
                      ).toLocaleDateString()}
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
                    stateColors[selectedPlan.study_plans_state]
                  }`}
                >
                  {selectedPlan.study_plans_state}
                </span>
                <button
                  onClick={() => navigate(`/woomoonkyung/edit/${planId}`)}
                  className="p-2 text-gray-400 transition-colors hover:text-blue-500"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress */}
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
          <div className="flex items-center justify-between ">
            <h3 className="items-center mb-6 text-lg font-semibold text-gray-800">
              Study Plan Nodes
            </h3>

            <button
              onClick={() => navigate(`/woomoonkyung/${planId}/nodes`)}
              className="p-2 mb-4 text-gray-400 transition-colors hover:text-blue-500"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              {nodes.map((node, index) => (
                <div
                  key={node.study_plan_node_id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => toggleNodeCompletion(node.study_plan_node_id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    node.completed
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                  } ${draggedItem === index ? "opacity-50 scale-95" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Drag Handle */}
                    <div className="cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Position */}
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-[#587CF0] flex-shrink-0">
                      {node.position}
                    </div>

                    {/* Tech Stack Image */}
                    <div className="flex-shrink-0 w-10 h-10 p-1 bg-white border rounded-lg">
                      {node.tech_stack_img_url ? (
                        <img
                          src={node.tech_stack_img_url}
                          alt={node.tech_stack_name}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-xs font-semibold text-white bg-[#587CF0] rounded">
                          {node.tech_stack_name?.[0]}
                        </div>
                      )}
                    </div>

                    {/* Node Info */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`mb-1 font-semibold ${
                          node.completed
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {node.study_plan_node_name}
                      </h4>

                      <p
                        className={`text-sm mb-2 ${
                          node.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-600"
                        }`}
                      >
                        {node.description}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(node.start_date).toLocaleDateString()} -{" "}
                          {new Date(node.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions (유지) */}
                    <div
                      className="flex flex-col items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="transition-transform hover:scale-110">
                        {node.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <div className="w-6 h-6 transition-colors border-2 border-gray-300 rounded-full hover:border-gray-400" />
                        )}
                      </button>

                      <button
                        onClick={() => openEditModal(node)}
                        className="p-1 text-gray-400 transition-colors rounded hover:text-blue-500 hover:bg-blue-50"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

      {/* Edit Modal */}
      {isEditModalOpen && editingNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Study Node
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-gray-400 transition-colors hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Node Name
                </label>
                <input
                  type="text"
                  value={editingNode.study_plan_node_name}
                  onChange={(e) =>
                    setEditingNode({
                      ...editingNode,
                      study_plan_node_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={editingNode.description}
                  onChange={(e) =>
                    setEditingNode({
                      ...editingNode,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editingNode.start_date}
                    onChange={(e) =>
                      setEditingNode({
                        ...editingNode,
                        start_date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={editingNode.end_date}
                    onChange={(e) =>
                      setEditingNode({
                        ...editingNode,
                        end_date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="completed"
                  checked={editingNode.completed}
                  onChange={(e) =>
                    setEditingNode({
                      ...editingNode,
                      completed: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="completed"
                  className="text-sm font-medium text-gray-700"
                >
                  Mark as completed
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveNodeEdit}
                className="px-4 py-2 text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6de8] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WoomoonkyungDetail;
