import React, { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import { woomoonjeongData } from "../../../data/woomoonjeong/woomoonjeongData";
import { TodoFormData } from "../../../types/Woomoonjeong/woomoonjeong";

interface TodoManagementCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const TodoManagementCreate: React.FC<TodoManagementCreateProps> = ({
  isOpen,
  onClose,
}) => {
  const formFieldData: string[] = [
    "web",
    "app",
    "server",
    "game",
    "security",
    "work",
    "other",
  ];

  const [formData, setFormData] = useState<TodoFormData>({
    name: "",
    description: "",
    field_id: woomoonjeongData[0]?.id,
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    status: "pending",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Todo 이름을 입력해주세요.";
    if (!formData.start_date) newErrors.start_date = "시작일을 선택해주세요.";
    if (!formData.end_date) newErrors.end_date = "종료일을 선택해주세요.";

    if (formData.start_date && formData.end_date) {
      if (new Date(formData.start_date) > new Date(formData.end_date)) {
        newErrors.end_date = "종료일은 시작일보다 늦어야 합니다.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("CREATE TODO:", formData);
      onClose(); // 제출 후 모달 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className="relative w-full max-w-2xl p-6 bg-white shadow-lg rounded-xl"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-500 rounded top-4 right-4 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Todo</h1>
            <p className="text-gray-600">Create a new learning task</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Todo Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              문서 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter todo name..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] transition-all ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter todo description..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] transition-all"
            />
          </div>

          {/* Field */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Related Field <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {formFieldData.map((field, index) => (
                <button
                  key={field}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, field_id: index + 1 }))
                  }
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    formData.field_id === index + 1
                      ? "bg-[#587CF0] text-white border-[#587CF0]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] transition-all ${
                  errors.start_date ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.start_date && (
                <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] transition-all ${
                  errors.end_date ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.end_date && (
                <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0]"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
            >
              <Save className="w-4 h-4" />
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoManagementCreate;
