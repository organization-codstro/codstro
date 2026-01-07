import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { todosData } from "../../data/woomoonjeong/woomoonjeongData";
import { TodoFormData, Todo } from "../../types/Woomoonjeong/woomoonjeong";
import TodoInputField from "../../components/Woomoonjeong/TodoManagementUpdate/TodoInputField";
import FieldSelector from "../../components/Woomoonjeong/TodoManagementUpdate/FieldSelector";


const TodoManagementUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [formData, setFormData] = useState<TodoFormData>({
    name: "",
    description: "",
    field_id: 1,
    start_date: "",
    end_date: "",
    status: "pending",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate logic...
    if (formData.name.trim()) {
      console.log("UPDATE:", { id: todo?.id, ...formData });
      navigate(`/woomoonjeong/todo/${todoId}`);
    }
  };

  if (!todo)
    return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Todo</h1>
            <p className="text-gray-600">Update your todo details</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 bg-white border border-purple-100 shadow-sm rounded-xl"
        >
          <TodoInputField
            label="Todo Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0]"
            />
          </div>

          <FieldSelector
            fields={[
              "web",
              "app",
              "server",
              "game",
              "security",
              "work",
              "other",
            ]}
            selectedId={formData.field_id}
            onSelect={(id) =>
              setFormData((prev) => ({ ...prev, field_id: id }))
            }
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TodoInputField
              label="Start Date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              error={errors.start_date}
              required
            />
            <TodoInputField
              label="End Date"
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
              error={errors.end_date}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8]"
            >
              <Save className="w-4 h-4" /> Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoManagementUpdate;
