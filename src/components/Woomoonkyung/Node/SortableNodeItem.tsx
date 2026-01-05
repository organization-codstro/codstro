import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Save,
  X,
  GripVertical,
  Calendar,
  Trash2,
  CreditCard as Edit3,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  StudyPlan,
  StudyPlanNode,
  TechStack,
  techStacks,
} from "../../../data/Woomoonkyung/woomoonkyungData";

interface StudyPlanNodeEditorProps {
  studyPlan: StudyPlan;
  existingNodes: StudyPlanNode[];
  onSave: (
    nodes: Omit<StudyPlanNode, "study_plan_node_id" | "created_date">[]
  ) => void;
  onBack: () => void;
}

interface NodeFormData {
  study_plan_node_name: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  position: number;
  tech_stack_id: string;
}

const SortableNodeItem: React.FC<{
  node: NodeFormData & { id: string };
  techStacks: TechStack[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ node, techStacks, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const techStack = techStacks.find(
    (ts) => ts.tech_stack_id === node.tech_stack_id
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-6 h-6 bg-[#587CF0] text-white text-sm font-medium rounded-full">
              {node.position}
            </span>
            <h4 className="font-medium text-gray-800">
              {node.study_plan_node_name}
            </h4>
            {techStack && (
              <span className="px-2 py-1 text-xs text-blue-700 border border-blue-200 rounded bg-blue-50">
                {techStack.tech_stack_name}
              </span>
            )}
          </div>
          <p className="mb-2 text-sm text-gray-600">{node.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {node.start_date} - {node.end_date}
              </span>
            </div>
            {node.completed && (
              <span className="px-2 py-1 text-green-700 bg-green-100 rounded">
                완료
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(node.id)}
            className="p-2 text-gray-400 transition-colors hover:text-blue-500"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(node.id)}
            className="p-2 text-gray-400 transition-colors hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const StudyPlanNodeEditor: React.FC<StudyPlanNodeEditorProps> = ({
  studyPlan,
  existingNodes,
  onSave,
  onBack,
}) => {
  const [nodes, setNodes] = useState<(NodeFormData & { id: string })[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [formData, setFormData] = useState<NodeFormData>({
    study_plan_node_name: "",
    description: "",
    start_date: studyPlan.study_plans_start_date,
    end_date: studyPlan.study_plans_end_date,
    completed: false,
    position: 1,
    tech_stack_id: techStacks[0]?.tech_stack_id || "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Convert existing nodes to form format
    const formattedNodes = existingNodes
      .map((node) => ({
        id: node.study_plan_node_id,
        study_plan_node_name: node.study_plan_node_name,
        description: node.description,
        start_date: node.start_date,
        end_date: node.end_date,
        completed: node.completed,
        position: node.position,
        tech_stack_id: node.tech_stack_id,
      }))
      .sort((a, b) => a.position - b.position);

    setNodes(formattedNodes);
  }, [existingNodes]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setNodes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        // Update positions
        return newItems.map((item, index) => ({
          ...item,
          position: index + 1,
        }));
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddNode = () => {
    if (!formData.study_plan_node_name.trim() || !formData.description.trim())
      return;

    const newNode = {
      id: `temp_${Date.now()}`,
      ...formData,
      position: nodes.length + 1,
    };

    setNodes((prev) => [...prev, newNode]);
    setFormData({
      study_plan_node_name: "",
      description: "",
      start_date: studyPlan.study_plans_start_date,
      end_date: studyPlan.study_plans_end_date,
      completed: false,
      position: nodes.length + 2,
      tech_stack_id: techStacks[0]?.tech_stack_id || "",
    });
    setShowAddForm(false);
  };

  const handleEditNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setFormData({
        study_plan_node_name: node.study_plan_node_name,
        description: node.description,
        start_date: node.start_date,
        end_date: node.end_date,
        completed: node.completed,
        position: node.position,
        tech_stack_id: node.tech_stack_id,
      });
      setEditingNode(nodeId);
      setShowAddForm(true);
    }
  };

  const handleUpdateNode = () => {
    if (!formData.study_plan_node_name.trim() || !formData.description.trim())
      return;

    setNodes((prev) =>
      prev.map((node) =>
        node.id === editingNode ? { ...node, ...formData } : node
      )
    );

    setEditingNode(null);
    setShowAddForm(false);
    setFormData({
      study_plan_node_name: "",
      description: "",
      start_date: studyPlan.study_plans_start_date,
      end_date: studyPlan.study_plans_end_date,
      completed: false,
      position: nodes.length + 1,
      tech_stack_id: techStacks[0]?.tech_stack_id || "",
    });
  };

  const handleDeleteNode = (nodeId: string) => {
    if (confirm("이 노드를 삭제하시겠습니까?")) {
      setNodes((prev) => {
        const filtered = prev.filter((node) => node.id !== nodeId);
        // Reorder positions
        return filtered.map((node, index) => ({
          ...node,
          position: index + 1,
        }));
      });
    }
  };

  const handleSave = () => {
    const nodesToSave = nodes.map(({ id, ...node }) => ({
      ...node,
      study_plan_id: studyPlan.study_plan_id,
    }));
    onSave(nodesToSave);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">노드 구성</h1>
          <p className="text-gray-600">
            {studyPlan.study_plan_name}의 학습 단계를 설정해주세요
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          저장
        </button>
      </div>

      {/* Plan Info */}
      <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
        <div className="flex items-center gap-4">
          {studyPlan.study_plans_image_url && (
            <img
              src={studyPlan.study_plans_image_url}
              alt={studyPlan.study_plan_name}
              className="object-cover w-16 h-16 rounded-lg"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {studyPlan.study_plan_name}
            </h2>
            <p className="text-sm text-gray-600">
              {studyPlan.study_plan_description}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {studyPlan.study_plans_start_date} ~{" "}
              {studyPlan.study_plans_end_date}
            </p>
          </div>
        </div>
      </div>

      {/* Add Node Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          학습 노드 ({nodes.length}개)
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          노드 추가
        </button>
      </div>

      {/* Add/Edit Node Form */}
      {showAddForm && (
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h4 className="mb-4 text-lg font-medium text-gray-800">
            {editingNode ? "노드 수정" : "새 노드 추가"}
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                노드 이름
              </label>
              <input
                type="text"
                name="study_plan_node_name"
                value={formData.study_plan_node_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
                placeholder="예: HTML 기초 학습"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                기술 스택
              </label>
              <select
                name="tech_stack_id"
                value={formData.tech_stack_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
              >
                {techStacks.map((tech) => (
                  <option key={tech.tech_stack_id} value={tech.tech_stack_id}>
                    {tech.tech_stack_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                설명
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent resize-none"
                placeholder="이 노드에서 학습할 내용을 설명해주세요..."
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                시작일
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                종료일
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
              />
            </div>
            <div className="flex items-center md:col-span-2">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#587CF0] focus:ring-[#587CF0] border-gray-300 rounded"
              />
              <label className="block ml-2 text-sm text-gray-700">완료됨</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingNode(null);
                setFormData({
                  study_plan_node_name: "",
                  description: "",
                  start_date: studyPlan.study_plans_start_date,
                  end_date: studyPlan.study_plans_end_date,
                  completed: false,
                  position: nodes.length + 1,
                  tech_stack_id: techStacks[0]?.tech_stack_id || "",
                });
              }}
              className="px-4 py-2 text-gray-700 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={editingNode ? handleUpdateNode : handleAddNode}
              className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
            >
              {editingNode ? "수정" : "추가"}
            </button>
          </div>
        </div>
      )}

      {/* Nodes List */}
      <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
        {nodes.length === 0 ? (
          <div className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-800">
              노드가 없습니다
            </h3>
            <p className="mb-4 text-gray-600">
              첫 번째 학습 노드를 추가해보세요
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
            >
              노드 추가
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={nodes.map((n) => n.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {nodes.map((node) => (
                  <SortableNodeItem
                    key={node.id}
                    node={node}
                    techStacks={techStacks}
                    onEdit={handleEditNode}
                    onDelete={handleDeleteNode}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default StudyPlanNodeEditor;
