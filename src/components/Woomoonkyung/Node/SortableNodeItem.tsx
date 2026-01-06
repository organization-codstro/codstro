/**
 * [ID 관리 전략: 클라이언트-서버 동기화]
 * * 1. 기존 데이터 (DB):
 * - study_plan_node_id는 DB에서 할당된 양의 정수(1, 2, 3...)를 사용합니다.
 * * 2. 신규 데이터 (Client-side):
 * - 사용자가 노드를 추가할 때, 드래그 앤 드롭(dnd-kit) 식별을 위해
 * Date.now()를 이용한 임시 ID(예: 1700000000000 이상의 큰 숫자)를 할당합니다.
 * * 3. 서버 전송 및 DB 저장 시 처리:
 * - handleSave 함수에서 id 값을 검사하여, 임시 ID(1조 이상)인 경우
 * 신규 생성 건으로 판단하고 study_plan_node_id를 undefined 또는 0으로 변환하여 송신합니다.
 * - DB 관리자는 전달받은 노드 리스트 중 PK가 없는 항목을 신규 INSERT 처리하면 됩니다.
 */

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
  FileText,
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
import { techStacks } from "../../../data/Woomoonkyung/woomoonkyungData";
import {
  SortableNodeItemNodeFormData,
  StudyPlan,
  StudyPlanNode,
  TechStack,
} from "../../../types/Woomoonkyung/StudyPlanNode";

interface StudyPlanNodeEditorProps {
  studyPlan: StudyPlan;
  existingNodes: StudyPlanNode[];
  onSave: (
    nodes: (Omit<StudyPlanNode, "study_plan_node_id" | "created_date"> & {
      study_plan_node_id?: number;
    })[]
  ) => void;
  onBack: () => void;
}

const SortableNodeItem: React.FC<{
  node: SortableNodeItemNodeFormData & { id: number };
  techStacks: TechStack[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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
    (ts) => Number(ts.tech_stack_id) === node.tech_stack_id
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </div>

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
          <p className="mb-2 text-sm text-gray-600 line-clamp-1">
            {node.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {node.start_date} ~ {node.end_date}
              </span>
            </div>
            {node.completed && (
              <span className="px-2 py-0.5 text-green-700 bg-green-50 border border-green-200 rounded">
                완료됨
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(node.id)}
            className="p-2 text-gray-400 transition-colors hover:text-[#587CF0] hover:bg-blue-50 rounded-lg"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(node.id)}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-500 hover:bg-red-50"
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
  const [nodes, setNodes] = useState<
    (SortableNodeItemNodeFormData & { id: number })[]
  >([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNode, setEditingNode] = useState<number | null>(null);
  const [formData, setFormData] = useState<SortableNodeItemNodeFormData>({
    study_plan_node_name: "",
    description: "",
    start_date: studyPlan.study_plans_start_date,
    end_date: studyPlan.study_plans_end_date,
    completed: false,
    position: 1,
    tech_stack_id: techStacks[0] ? Number(techStacks[0].tech_stack_id) : 0,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const formattedNodes = existingNodes
      .map((node) => ({
        id: node.study_plan_node_id,
        study_plan_node_name: node.study_plan_node_name,
        description: node.description,
        start_date: node.start_date,
        end_date: node.end_date,
        completed: node.completed,
        position: node.position,
        tech_stack_id: Number(node.tech_stack_id),
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
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "tech_stack_id"
          ? Number(value)
          : value,
    }));
  };

  const handleAddNode = () => {
    if (!formData.study_plan_node_name.trim() || !formData.description.trim())
      return;

    const newNode = {
      id: Date.now(),
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
      tech_stack_id: techStacks[0] ? Number(techStacks[0].tech_stack_id) : 0,
    });
    setShowAddForm(false);
  };

  const handleEditNode = (nodeId: number) => {
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
      tech_stack_id: techStacks[0] ? Number(techStacks[0].tech_stack_id) : 0,
    });
  };

  const handleDeleteNode = (nodeId: number) => {
    if (window.confirm("이 노드를 삭제하시겠습니까?")) {
      setNodes((prev) => {
        const filtered = prev.filter((node) => node.id !== nodeId);
        return filtered.map((node, index) => ({
          ...node,
          position: index + 1,
        }));
      });
    }
  };

  const handleSave = () => {
    const nodesToSave = nodes.map(({ id, ...node }) => {
      const selectedTech = techStacks.find(
        (t) => Number(t.tech_stack_id) === node.tech_stack_id
      );
      return {
        ...node,
        study_plan_node_id: id > 2000000000000 ? undefined : id,
        study_plan_id: studyPlan.study_plan_id,
        tech_stack_name: selectedTech?.tech_stack_name || "",
        tech_stack_img_url: selectedTech?.tech_stack_img_url || "",
      };
    });
    onSave(nodesToSave);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
          className="px-6 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors flex items-center gap-2 font-medium shadow-sm"
        >
          <Save className="w-4 h-4" />
          저장하기
        </button>
      </div>

      <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
        <div className="flex items-center gap-4">
          {studyPlan.study_plans_image_url ? (
            <img
              src={studyPlan.study_plans_image_url}
              alt={studyPlan.study_plan_name}
              className="object-cover w-20 h-20 border border-gray-100 rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-20 h-20 border border-gray-100 rounded-lg bg-gray-50">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {studyPlan.study_plan_name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {studyPlan.study_plan_description}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs font-medium text-[#587CF0] bg-blue-50 px-2 py-1 rounded w-fit">
              <Calendar className="w-3 h-3" />
              {studyPlan.study_plans_start_date} ~{" "}
              {studyPlan.study_plans_end_date}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
          학습 노드 리스트
          <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {nodes.length}
          </span>
        </h3>
        <button
          onClick={() => {
            setEditingNode(null);
            setShowAddForm(true);
          }}
          className="px-4 py-2 text-[#587CF0] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          노드 추가
        </button>
      </div>

      {showAddForm && (
        <div className="p-6 bg-white border-2 border-[#587CF0]/20 shadow-md rounded-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-gray-800">
              {editingNode ? "노드 정보 수정" : "새로운 학습 단계 추가"}
            </h4>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                노드 이름
              </label>
              <input
                type="text"
                name="study_plan_node_name"
                value={formData.study_plan_node_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none transition-all"
                placeholder="예: React 기초 문법 마스터"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                기술 스택
              </label>
              <select
                name="tech_stack_id"
                value={formData.tech_stack_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none bg-white"
              >
                {techStacks.map((tech) => (
                  <option
                    key={tech.tech_stack_id}
                    value={Number(tech.tech_stack_id)}
                  >
                    {tech.tech_stack_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                노드 상세 설명
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none resize-none transition-all"
                placeholder="해당 단계에서 중점적으로 학습할 목표를 적어주세요."
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                시작일
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                종료일
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
              />
            </div>
            <div className="flex items-center gap-2 py-2 md:col-span-2">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={formData.completed}
                onChange={handleInputChange}
                className="h-5 w-5 text-[#587CF0] focus:ring-[#587CF0] border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="completed"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                이 단계를 이미 완료했습니다
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 mt-8 border-t">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingNode(null);
              }}
              className="px-5 py-2 font-medium text-gray-500 transition-colors hover:text-gray-700"
            >
              취소
            </button>
            <button
              onClick={editingNode ? handleUpdateNode : handleAddNode}
              className="px-6 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] font-bold shadow-sm transition-all"
            >
              {editingNode ? "수정 완료" : "노드 추가하기"}
            </button>
          </div>
        </div>
      )}

      <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        {nodes.length === 0 ? (
          <div className="py-16 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 border border-gray-200 border-dashed rounded-full bg-gray-50">
              <Plus className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-gray-800">
              등록된 노드가 없습니다
            </h3>
            <p className="mb-6 text-gray-500">
              학습 계획을 달성하기 위한 세부 단계를 추가해 보세요.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-[#587CF0] text-white rounded-lg font-bold shadow-md"
            >
              첫 번째 노드 만들기
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
              <div className="space-y-4">
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
