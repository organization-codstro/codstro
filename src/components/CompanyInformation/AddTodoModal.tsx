import { X, Calendar, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  AddTodoModalProeps,
  TodoForm,
} from "../../types/pages/CompanyInformation/AddTodoModal";
import {
  DEFAULT_GROUP_NAME,
  TODO_STATUS_TYPE,
} from "../../constants/TodoManagement/TodoManagement";

export const AddTodoModal = ({
  isOpen,
  onClose,
  conceptName,
  todoType,
  onConfirm,
  availableGroups,
}: AddTodoModalProeps) => {
  const [isPending, setIsPending] = useState(false);

  const getDefaultName = () => {
    if (todoType === "documentation")
      return `Explore ${conceptName} Documentation`;
    if (todoType === "clone_project")
      return `Build a project with ${conceptName}`;
    return "";
  };

  const [formData, setFormData] = useState<TodoForm>({
    todo_name: "",
    todo_content: "",
    todo_description: "",
    todo_start_date: "",
    todo_end_date: "",
    todo_status: "waiting",
    group_name: DEFAULT_GROUP_NAME,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, todo_name: getDefaultName() }));
    }
  }, [isOpen, conceptName, todoType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    try {
      setIsPending(true);
      await onConfirm(formData);
      handleClose();
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    setFormData({
      todo_name: "",
      todo_content: "",
      todo_description: "",
      todo_start_date: "",
      todo_end_date: "",
      todo_status: "waiting",
      group_name: DEFAULT_GROUP_NAME,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Todo</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              htmlFor="todo-name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Related to: <span className="text-blue-600">{conceptName}</span>
            </label>
            <input
              type="text"
              value={formData.todo_name}
              onChange={(e) =>
                setFormData({ ...formData, todo_name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 그룹 선택 버튼 */}
          <div>
            <p className="block mb-2 text-sm font-medium text-gray-700">
              그룹 이름 <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {availableGroups.map((group) => (
                <button
                  key={group.group_id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      group_name: group.group_id,
                    }))
                  }
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    formData.group_name === group.group_id
                      ? "bg-[#587CF0] text-white border-[#587CF0]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {group.group_name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="todo-description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              value={formData.todo_description}
              onChange={(e) =>
                setFormData({ ...formData, todo_description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="todo-start-date"
                className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700"
              >
                <Calendar className="w-4 h-4" /> Start Date
              </label>
              <input
                type="date"
                value={formData.todo_start_date}
                onChange={(e) =>
                  setFormData({ ...formData, todo_start_date: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="todo-end-date"
                className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700"
              >
                <Calendar className="w-4 h-4" /> End Date
              </label>
              <input
                type="date"
                value={formData.todo_end_date}
                onChange={(e) =>
                  setFormData({ ...formData, todo_end_date: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="todo-status"
              className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700"
            >
              <AlertCircle className="w-4 h-4" /> Status
            </label>
            <select
              value={formData.todo_status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  todo_status: e.target.value as TODO_STATUS_TYPE,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            >
              <option value="waiting">Waiting</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Add Todo"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
