import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import {
  todosData,
  woomoonjeongData,
} from "../../data/woomoonjeong/woomoonjeongData";
import { Todo, TodoFormData } from "../../types/Woomoonjeong/woomoonjeong";

const TodoManagementUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [formData, setFormData] = useState<TodoFormData>({
    name: "",
    description: "",
    field_id: woomoonjeongData[0]?.id,
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    status: "pending",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /** 기존 Todo 로드 */
  useEffect(() => {
    const foundTodo = todosData.find((t) => t.id === Number(todoId));

    if (!foundTodo) {
      navigate("/woomoonjeong/todo");
      return;
    }

    setTodo(foundTodo);

    setFormData({
      name: foundTodo.name,
      description: foundTodo.description,
      field_id: Number(foundTodo.field_id),
      start_date: foundTodo.start_date,
      end_date: foundTodo.end_date,
      status: foundTodo.status,
    });
  }, [todoId, navigate]);

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

    // 입력 시작 시 기존 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Todo 이름을 입력해주세요.";
    }

    if (!formData.start_date) {
      newErrors.start_date = "시작일을 선택해주세요.";
    }

    if (!formData.end_date) {
      newErrors.end_date = "종료일을 선택해주세요.";
    }

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

    if (!todo) return;

    if (validateForm()) {
      console.log("UPDATE TODO:", { id: todo.id, ...formData });
      navigate(`/woomoonjeong/todo/${todo.id}`);
    }
  };

  if (!todo) {
    return <div className="p-8 text-center text-gray-500">Loading todo...</div>;
  }

  const formFieldData: string[] = [
    "web",
    "app",
    "server",
    "game",
    "security",
    "work",
    "other",
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 transition-colors rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Todo</h1>
            <p className="text-gray-600">Update your todo details</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Todo Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Todo Name *
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] transition-all"
              />
            </div>

            {/* Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Related Field
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
                  Start Date *
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  End Date *
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
                Status
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
                onClick={() => navigate(`/woomoonjeong/todo/${todoId}`)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8]"
              >
                <Save className="w-4 h-4" />
                Update Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoManagementUpdate;
