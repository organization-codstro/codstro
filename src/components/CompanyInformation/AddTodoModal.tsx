import { X, Calendar, AlertCircle, FolderOpen, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  AddTodoModalProps,
  TodoForm,
} from "../../types/pages/CompanyInformation/AddTodoModal";

// Props 타입에 onConfirm이 포함되어 있다고 가정합니다.
// 만약 타입 정의에 없다면 (formData: TodoForm) => Promise<void> 를 추가해야 합니다.
interface ExtendedAddTodoModalProps extends AddTodoModalProps {
  onConfirm: (formData: TodoForm) => Promise<void>;
}

export default function AddTodoModal({
  isOpen,
  onClose,
  conceptName,
  todoType,
  onConfirm, // 부모로부터 받은 확정 함수
}: ExtendedAddTodoModalProps) {
  const [isPending, setIsPending] = useState(false);

  const getDefaultTitle = () => {
    if (todoType === "documentation")
      return `Explore ${conceptName} Documentation`;
    if (todoType === "clone_project")
      return `Build a project with ${conceptName}`;
    return "";
  };

  const [formData, setFormData] = useState<TodoForm>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    group: "personal",
  });

  // 모달이 열릴 때마다 기본 타이틀 설정
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, title: getDefaultTitle() }));
    }
  }, [isOpen, conceptName, todoType]);

  const groups = [
    { id: "app", name: "App" },
    { id: "web", name: "Web" },
    { id: "server", name: "Server" },
    { id: "game", name: "Game" },
    { id: "security", name: "Security" },
    { id: "work", name: "Work" },
    { id: "other", name: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    try {
      setIsPending(true);
      // 부모 컴포넌트의 handleAddTodo 실행 (formData 전체 전달)
      await onConfirm(formData);
      handleClose();
    } catch (error) {
      // 에러 처리는 부모의 toast에서 수행됨
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      group: "personal",
      description: "",
      dueDate: "",
      priority: "medium",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
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
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Related to: <span className="text-blue-600">{conceptName}</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700">
              <FolderOpen className="w-4 h-4" /> Group *
            </label>
            <select
              value={formData.group}
              onChange={(e) =>
                setFormData({ ...formData, group: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              required
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none outline-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4" /> Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-700">
                <AlertCircle className="w-4 h-4" /> Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as any })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"
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
}
