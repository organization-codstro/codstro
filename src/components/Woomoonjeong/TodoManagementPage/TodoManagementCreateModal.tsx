import React, { useEffect, useState } from "react";
import { Save, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// 타입 및 상수
import { TodoManagementCreateProps } from "../../../types/pages/Woomoonjeong/TodoManagementPage/CreateTodoManagementModal";
import { TodoManagementService } from "../../../api/Woomoonjeong/TodoManagementPage";
import { CreateTodoParams } from "../../../types/api/Woomoonjeong/TodoManagementPage";

const TodoManagementCreateModal: React.FC<TodoManagementCreateProps> = ({
  isOpen,
  onClose,
  onAdd,
  availableGroups,
  selectedDate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateTodoParams>({
    todo_name: "",
    todo_content: "",
    todo_description: "",
    group_id: "",
    todo_start_date: new Date().toISOString().split("T")[0],
    todo_end_date: new Date().toISOString().split("T")[0],
    todo_status: "waiting",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (availableGroups && availableGroups.length > 0 && !formData.group_id) {
      setFormData((prev) => ({
        ...prev,
        group_id: availableGroups[0].group_id,
      }));
    }
  }, [availableGroups]);

  // selectedDate가 바뀔 때마다 시작일/종료일 동기화
  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        todo_start_date: selectedDate,
        todo_end_date: selectedDate,
      }));
    }
  }, [selectedDate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const start = prev.todo_start_date;
      const end = prev.todo_end_date;

      // 시작 날짜 변경 시
      if (name === "todo_start_date") {
        if (end && new Date(end) < new Date(value)) {
          return {
            ...prev,
            todo_start_date: value,
            todo_end_date: value,
          };
        }
      }

      if (name === "todo_end_date") {
        if (start && new Date(value) < new Date(start)) {
          return {
            ...prev,
            todo_end_date: start, // 핵심
          };
        }
      }

      return {
        ...prev,
        [name]: value,
      };
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.todo_name.trim())
      newErrors.todo_name = "할일 이름을 입력해주세요.";
    if (!formData.group_id) newErrors.group_id = "관련 분야를 선택해주세요.";
    if (!formData.todo_start_date)
      newErrors.todo_start_date = "시작일을 선택해주세요.";
    if (!formData.todo_end_date)
      newErrors.todo_end_date = "종료일을 선택해주세요.";

    if (formData.todo_start_date && formData.todo_end_date) {
      if (
        new Date(formData.todo_start_date) > new Date(formData.todo_end_date)
      ) {
        newErrors.todo_end_date = "종료일은 시작일보다 늦어야 합니다.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("할일을 생성하는 중...");

    try {
      await TodoManagementService.createTodo({
        todo_name: formData.todo_name,
        todo_description: formData.todo_description,
        group_id: formData.group_id,
        todo_start_date: formData.todo_start_date,
        todo_status: formData.todo_status,
        todo_end_date: formData.todo_end_date,
        todo_content: formData.todo_content,
      });

      toast.update(toastId, {
        render: "새로운 할일이 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });

      if (onAdd) onAdd(); // 리스트 갱신 함수 호출
      onClose(); // 모달 닫기

      // 폼 초기화
      setFormData({
        todo_name: "",
        todo_content: "",
        todo_description: "",
        group_id: "",
        todo_start_date: new Date().toISOString().split("T")[0],
        todo_end_date: new Date().toISOString().split("T")[0],
        todo_status: "waiting",
      });
    } catch (error) {
      toast.update(toastId, {
        render: "생성에 실패했습니다. 다시 시도해주세요.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl p-6 bg-white shadow-lg rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-500 rounded top-4 right-4 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Todo</h1>
            <p className="text-gray-600">Create a new learning task</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 할일 이름 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              할일 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="todo_name"
              value={formData.todo_name}
              onChange={handleChange}
              placeholder="Enter todo name..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none transition-all ${
                errors.todo_name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.todo_name && (
              <p className="mt-1 text-sm text-red-600">{errors.todo_name}</p>
            )}
          </div>

          {/* 할일 설명 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              할일 설명
            </label>
            <textarea
              name="todo_description"
              value={formData.todo_description}
              onChange={handleChange}
              placeholder="Enter todo description..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none transition-all ${
                errors.todo_description ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.todo_description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.todo_description}
              </p>
            )}
          </div>

          {/* 내용 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              할일 내용
            </label>
            <textarea
              name="todo_content"
              rows={4}
              value={formData.todo_content}
              onChange={handleChange}
              placeholder="Enter todo description..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] outline-none transition-all"
            />
          </div>

          {/* 그룹 선택 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              그룹 이름 <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableGroups.map((grop) => (
                <button
                  key={grop.group_id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      group_id: grop.group_id,
                    }))
                  }
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    formData.group_id === grop.group_id
                      ? "bg-[#587CF0] text-white border-[#587CF0]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {grop.group_name}
                </button>
              ))}
            </div>
            {errors.group_id && (
              <p className="mt-1 text-sm text-red-600">{errors.group_id}</p>
            )}
          </div>

          {/* 날짜 설정 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="todo_start_date"
                value={formData.todo_start_date}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none transition-all ${
                  errors.todo_start_date ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.todo_start_date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.todo_start_date}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="todo_end_date"
                value={formData.todo_end_date}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none transition-all ${
                  errors.todo_end_date ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.todo_end_date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.todo_end_date}
                </p>
              )}
            </div>
          </div>

          {/* 상태 설정 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="todo_status"
              value={formData.todo_status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
            >
              <option value="waiting">Waiting</option>
              <option value="in progress">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors disabled:opacity-50 min-w-[140px] justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Todo
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoManagementCreateModal;
