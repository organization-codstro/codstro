import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// API 서비스 및 인증 서비스
import { TodoManagementDetailService } from "../../api/TodoManagement/TodoManagementDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";

// UI 컴포넌트 및 타입
import { TodoInputField } from "../../components/TodoManagement/TodoManagementUpdate/TodoInputField";
import { GroupSelector } from "../../components/TodoManagement/TodoManagementUpdate/GroupSelector";
import { TodoManagementUpdateService } from "../../api/TodoManagement/TodoManagementUpdatePage";
import { TodoFormData } from "../../types/common/TodoManagement";

export default function TodoManagementUpdatePage() {
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();

  // --- 상태 관리 ---
  const [isLoading, setIsLoading] = useState(true);

  const [isUpdating, setIsUpdating] = useState(false);
  const [availableGroups, setAvailableGroups] = useState<
    { group_id: string; group_name: string }[]
  >([]);
  const [formData, setFormData] = useState<TodoFormData>({
    group_id: "",
    todo_name: "",
    todo_content: "",
    todo_description: "",
    todo_start_date: "",
    todo_end_date: "",
    todo_status: "waiting",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- 초기 데이터 로드 ---
  useEffect(() => {
    const fetchTodo = async () => {
      if (!todoId) return;

      setIsLoading(true);
      try {
        // 유저 확인
        const userId = await LoginService.getCurrentUserId();
        if (!userId) {
          toast.error("로그인된 사용자 정보를 찾을 수 없습니다.");
          navigate("/login");
          return;
        }

        const groupIds =
          await TodoManagementUpdateService.getUserGroups(userId);

        if (groupIds) setAvailableGroups(groupIds);

        if (!todoId) {
          return;
        }

        // 데이터 조회
        const data = await TodoManagementDetailService.getTodoDetail({
          todoId,
        });

        if (!data) {
          toast.error("할일을 찾을 수 없습니다.");
          return;
        }

        // DB 데이터를 Form 데이터로 매핑
        setFormData({
          todo_name: data.todo_name,
          todo_content: data.todo_content,
          todo_description: data.todo_description || "",
          group_id: data.group_id,
          todo_start_date: data.todo_start_date,
          todo_end_date: data.todo_end_date,
          todo_status: data.todo_status,
        });
      } catch (error) {
        console.error("할일 조회 실패:", error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [todoId, navigate]);

  // --- 핸들러 로직 ---
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      //시작 날짜 변경 시 검사
      if (name === "todo_start_date") {
        const start = value;
        const end = prev.todo_end_date;

        // 끝나는 날짜가 있고 + 시작보다 앞이면 → 자동 보정
        if (end && new Date(end) < new Date(start)) {
          return {
            ...prev,
            todo_start_date: start,
            todo_end_date: start, // 핵심
          };
        }
      }

      return { ...prev, [name]: value };
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // TodoInputField 전용 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e); // 내부적으로 공용 핸들러 재사용
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoId) return;

    // 간단한 유효성 검사
    if (!formData.todo_name.trim()) {
      setErrors({ todo_name: "할일 이름을 입력해주세요." });
      return;
    }

    setIsUpdating(true);
    const loadId = toast.loading("할일을 수정하는 중...");

    try {
      // API 서비스 호출 (DB 컬럼명에 맞춰 페이로드 구성)
      await TodoManagementDetailService.updateTodo({
        todoId: todoId,
        payload: {
          todo_name: formData.todo_name,
          todo_content: formData.todo_content,
          todo_description: formData.todo_description,
          group_id: formData.group_id,
          todo_start_date: formData.todo_start_date,
          todo_end_date: formData.todo_end_date,
          todo_status: formData.todo_status,
        },
      });

      toast.update(loadId, {
        render: "수정이 완료되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });

      navigate(`/todo-management/todo/${todoId}`);
    } catch (error) {
      toast.update(loadId, {
        render: "수정에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-[#587CF0] animate-spin" />
        <p className="text-gray-500">정보를 불러오고 있습니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/todo-management/todo/${todoId}`)}
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
            name="todo_name"
            value={formData.todo_name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="todo_content"
              rows={6}
              value={formData.todo_content}
              onChange={handleChange}
              placeholder="할일의 상세 내용을 입력하세요."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              todo Description
            </label>
            <textarea
              name="todo_description"
              rows={4}
              value={formData.todo_description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#587CF0] outline-none"
            />
          </div>

          <GroupSelector
            groups={availableGroups}
            selectedId={formData.group_id}
            onSelect={(id) =>
              setFormData((prev) => ({ ...prev, group_id: id }))
            }
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TodoInputField
              label="Start Date"
              name="todo_start_date"
              type="date"
              value={formData.todo_start_date}
              onChange={handleInputChange}
              error={errors.start_date}
              required
            />
            <TodoInputField
              label="End Date"
              name="todo_end_date"
              type="date"
              value={formData.todo_end_date}
              onChange={handleInputChange}
              error={errors.end_date}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="todo_status"
              value={formData.todo_status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#587CF0]"
            >
              <option value="waiting">waiting</option>
              <option value="in progress">in Progress</option>
              <option value="done">done</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex items-center gap-2 px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors disabled:opacity-50"
            >
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
