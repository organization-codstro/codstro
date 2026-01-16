import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// API 서비스 및 인증 서비스
import { TodoManagementDetailService } from "../../api/Woomoonjeong/TodoManagementDetailPage";
import { LoginService } from "../../api/Auth/LoginPage";

// UI 컴포넌트
import TodoDetailHeader from "../../components/Woomoonjeong/TodoManagementDetailPage/TodoDetailHeader";
import TodoStatusBadge from "../../components/Woomoonjeong/TodoManagementDetailPage/TodoStatusBadge";
import TodoInfoSection from "../../components/Woomoonjeong/TodoManagementDetailPage/TodoInfoSection";
import { TodoDetail } from "../../types/pages/Woomoonjeong/TodoManagementDetailPage/TodoManagementDetailPage";

export default function TodoManagementDetailPage() {
  const { todoId } = useParams<{ todoId: string }>();
  const navigate = useNavigate();

  // --- 상태 관리 ---
  const [todo, setTodo] = useState<TodoDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // --- 데이터 로드 ---
  useEffect(() => {
    const initPage = async () => {
      if (!todoId) {
        toast.error("할일 ID가 유효하지 않습니다.");
        navigate("/woomoonjeong");
        return;
      }

      setIsLoading(true);
      try {
        // 1. 유저 ID 확보
        const userId = await LoginService.getCurrentUserId();
        setCurrentUserId(userId);

        // 2. 상세 데이터 호출
        const data = await TodoManagementDetailService.getTodoDetail({
          todoId,
        });
        setTodo(data);
      } catch (error) {
        console.error("Todo 로드 실패:", error);
        toast.error("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initPage();
  }, [todoId, navigate]);

  // --- 기간 계산 로직 ---
  const diffDays = useMemo(() => {
    if (!todo) return 0;
    const start = new Date(todo.todo_start_date);
    const end = new Date(todo.todo_end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [todo]);

  // 로딩 상태 UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="text-gray-500 font-medium">
          상세 내용을 불러오는 중입니다...
        </p>
      </div>
    );
  }

  // 데이터 부재 시 UI (NotFoundView)
  if (!todo) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-screen text-center">
        <p className="text-xl font-semibold text-gray-800">Todo not found.</p>
        <p className="text-gray-500 mt-2">
          삭제되었거나 존재하지 않는 할일입니다.
        </p>
        <button
          onClick={() => navigate("/woomoonjeong")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <TodoDetailHeader
          onBack={() => navigate("/woomoonjeong")}
          onEdit={() => navigate(`/woomoonjeong/todo/${todo.todo_id}/edit`)}
        />

        <div className="p-8 space-y-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          {/* 상태 배지: 서비스 정의 값과 매칭 */}
          <TodoStatusBadge status={todo.todo_status} />

          <h2 className="text-2xl font-bold text-gray-800">{todo.todo_name}</h2>

          <TodoInfoSection label="Description">
            <p className="text-gray-600 leading-relaxed">
              {todo.todo_description || "No description provided."}
            </p>
          </TodoInfoSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TodoInfoSection label="Start Date">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-purple-500" />
                {new Date(todo.todo_start_date).toLocaleDateString()}
              </div>
            </TodoInfoSection>
            <TodoInfoSection label="End Date">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-purple-500" />
                {new Date(todo.todo_end_date).toLocaleDateString()}
              </div>
            </TodoInfoSection>
          </div>

          <TodoInfoSection label="Duration">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-blue-500" />
              {diffDays} day{diffDays !== 1 ? "s" : ""}
            </div>
          </TodoInfoSection>

          <TodoInfoSection label="Created">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              {new Date(todo.todo_created_date).toLocaleString()}
            </div>
          </TodoInfoSection>
        </div>
      </div>
    </div>
  );
}
