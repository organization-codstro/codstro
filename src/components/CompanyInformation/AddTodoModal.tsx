import { X, Calendar, AlertCircle, FolderOpen } from "lucide-react";
import { useState } from "react";
// React-Toastify 임포트
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // 그룹 목록
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

    toast.success("🚀 Todo added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // 토스트를 보여줄 시간을 주기 위해 약간의 지연 후 닫거나 바로 닫기 선택 가능
    // 여기서는 사용자 경험을 위해 즉시 입력창 초기화 및 닫기를 수행합니다.
    setTimeout(() => {
      handleClose();
    }, 500);
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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={handleBackdropClick}
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Add Todo</h2>
            <button
              onClick={handleClose}
              className="p-1 transition-colors rounded-lg hover:bg-gray-100"
              type="button"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Related to: <span className="text-blue-600">{conceptName}</span>
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
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
              <label className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700">
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
              <p className="mt-1 text-xs text-gray-500">
                Select which group this todo belongs to
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add details about what you need to do..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700">
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
                <label className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700">
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
                className="flex-1 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Add Todo
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
