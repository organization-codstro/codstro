import { X, Calendar, AlertCircle, FolderOpen } from "lucide-react";
import { useState } from "react";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  conceptName: string;
  todoType: "documentation" | "clone_project" | "custom";
}

interface TodoForm {
  title: string;
  group: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

export default function AddTodoModal({
  isOpen,
  onClose,
  conceptName,
  todoType,
}: AddTodoModalProps) {
  const [formData, setFormData] = useState<TodoForm>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    group: "personal",
  });

  // 그룹 목록 (실제로는 API나 props로 받아올 수 있습니다)
  const groups = [
    { id: "app", name: "App" },
    { id: "web", name: "Web" },
    { id: "server", name: "Server" },
    { id: "game", name: "Game" },
    { id: "security", name: "Security" },
    { id: "work", name: "Work" },
    { id: "other", name: "Other" },
  ];

  const getDefaultTitle = () => {
    if (todoType === "documentation") {
      return `Explore ${conceptName} Documentation`;
    } else if (todoType === "clone_project") {
      return `Build a project with ${conceptName}`;
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Todo submitted:", formData);
    alert("Todo added! (This is a demo - not actually saved)");
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: getDefaultTitle(),
      group: "personal",
      description: "",
      dueDate: "",
      priority: "medium",
    });
    onClose();
  };

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Todo</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Related to: <span className="text-blue-600">{conceptName}</span>
            </label>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Title *
            </label>
            <input
              type="text"
              value={formData.title || getDefaultTitle()}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Todo title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FolderOpen className="w-4 h-4" />
              Group *
            </label>
            <select
              value={formData.group}
              onChange={(e) =>
                setFormData({ ...formData, group: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select which group this todo belongs to
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add details about what you need to do..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as "low" | "medium" | "high",
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Todo
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
