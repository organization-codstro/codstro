import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Filter, Search, Target, Clock, Loader2 } from "lucide-react";

// API 및 인증 서비스
import { TodoManagementService } from "../../api/Woomoonjeong/TodoManagementPage";
import { LoginService } from "../../api/Auth/LoginPage";

// 타입 정의
import { Todo } from "../../types/pages/Woomoonjeong/woomoonjeong";

// 컴포넌트
import TodoManagementCreate from "../../components/Woomoonjeong/TodoManagementPage/CreateTodoManagementModal";
import TodoManagementHeader from "../../components/Woomoonjeong/TodoManagementPage/TodoManagementHeader";
import TodoCard from "../../components/Woomoonjeong/TodoManagementPage/TodoCard";
import TodoCalendar from "../../components/Woomoonjeong/TodoManagementPage/TodoCalendar";
import { DBTodo } from "../../types/pages/Woomoonjeong/TodoManagementPage/TodoManagementPage";

export default function TodoManagementPage() {
  const navigate = useNavigate();

  // --- 상태 관리 ---
  const [todos, setTodos] = useState<DBTodo[]>([]);
  const [monthlyTodos, setMonthlyTodos] = useState<any[]>([]); // 캘린더 점 표시용
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePendingId, setDeletePendingId] = useState<string | null>(null);
  const [availableGroups, setAvailableGroups] = useState<
    {
      group_id: string;
      group_name: string;
    }[]
  >([]);

  // --- 초기 데이터 로드 및 유저 확인 ---
  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true);
      try {
        await LoginService.getCurrentUserId();
        await fetchInitialData();
      } catch (error) {
        toast.error("데이터 로드에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, []);

  // --- 달력 월 변경 시 카운트 데이터 갱신 ---
  useEffect(() => {
    fetchMonthlyData();
  }, [calendarDate]);

  // --- 검색/필터 변경 시 목록 갱신 ---
  useEffect(() => {
    fetchFilteredList();
  }, [selectedDate, selectedStatus, searchQuery]);

  // --- 삭제 타이머 ---
  useEffect(() => {
    if (deletePendingId) {
      const timer = setTimeout(() => setDeletePendingId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  // --- 유저 그룹 정보 ---
  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true);
      try {
        const userId = await LoginService.getCurrentUserId();
        if (!userId) {
          navigate("/login");
          return;
        }

        // 유저의 그룹 정보 가져오기
        const groupIds = await TodoManagementService.getUserGroups(userId);
        if (groupIds) setAvailableGroups(groupIds);

        await fetchInitialData();
      } catch (error) {
        toast.error("데이터 로드에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, []);

  // --- API 호출 함수들 ---
  const fetchInitialData = async () => {
    const [listData, monthData] = await Promise.all([
      TodoManagementService.searchTodos({
        date: selectedDate,
        status: selectedStatus,
        query: searchQuery,
      }),
      TodoManagementService.getMonthlyTodoCount({
        year: calendarDate.getFullYear(),
        month: calendarDate.getMonth(),
      }),
    ]);
    setTodos(listData || []);
    setMonthlyTodos(monthData || []);
  };

  const fetchFilteredList = async () => {
    try {
      const data = await TodoManagementService.searchTodos({
        date: selectedDate,
        status: selectedStatus,
        query: searchQuery,
      });
      setTodos(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const data = await TodoManagementService.getMonthlyTodoCount({
        year: calendarDate.getFullYear(),
        month: calendarDate.getMonth(),
      });
      setMonthlyTodos(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // --- 핸들러 로직 ---
  const handleToggleStatus = async (e: React.MouseEvent, todo: DBTodo) => {
    e.stopPropagation();
    try {
      await TodoManagementService.toggleTodoStatus({
        todoId: todo.todo_id,
        currentStatus: todo.todo_status,
      });
      await fetchFilteredList();
      toast.success("상태가 변경되었습니다.");
    } catch (error) {
      toast.error("상태 변경 실패");
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (deletePendingId === id) {
      try {
        await TodoManagementService.deleteTodo({ todoId: id });
        setDeletePendingId(null);
        toast.success("할일이 삭제되었습니다.");
        await fetchFilteredList();
        await fetchMonthlyData();
      } catch (error) {
        toast.error("삭제 실패");
      }
    } else {
      setDeletePendingId(id);
    }
  };

  // 캘린더 점 표시를 위한 헬퍼 함수
  const getTodoCountForDate = (date: Date) => {
    const dStr = date.toISOString().split("T")[0];
    return monthlyTodos.filter(
      (t) => t.todo_start_date <= dStr && t.todo_end_date >= dStr
    ).length;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="font-medium text-gray-500">할일 목록을 가져오는 중...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 bg-gray-50"
      onClick={() => setDeletePendingId(null)}
    >
      <TodoManagementCreate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={() => {
          fetchFilteredList();
          fetchMonthlyData();
        }}
        availableGroups={availableGroups}
      />

      <div className="mx-auto space-y-6 max-w-7xl">
        <TodoManagementHeader onOpenModal={() => setIsModalOpen(true)} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-3">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 p-6 bg-white border border-purple-100 rounded-xl">
              <Filter className="w-4 h-4 text-gray-500" />
              {["all", "pending", "in-progress", "completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedStatus === s
                      ? "bg-[#587CF0] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
              <div className="flex items-center gap-2 ml-auto">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="border rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-[#587CF0]"
                />
              </div>
            </div>

            {/* Todo List */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h2 className="mb-6 text-lg font-semibold text-gray-800">
                Todos for {selectedDate.toLocaleDateString()}
              </h2>
              <div className="space-y-4">
                {todos.map((todo) => (
                  <TodoCard
                    key={todo.todo_id}
                    todo={
                      {
                        todo_id: todo.todo_id,
                        field_id: todo.field_id,
                        todo_name: todo.todo_name,
                        todo_status: todo.todo_status,
                        todo_start_date: todo.todo_start_date,
                        todo_end_date: todo.todo_end_date,
                        todo_description: todo.todo_description,
                        todo_created_date: todo.todo_created_date,
                      } as Todo
                    }
                    isDeletePending={deletePendingId === todo.todo_id}
                    onNavigate={() =>
                      navigate(`/woomoonjeong/todo/${todo.todo_id}`)
                    }
                    onToggleStatus={(e) => handleToggleStatus(e, todo)}
                    onDeleteClick={(e) => handleDelete(e, todo.todo_id)}
                  />
                ))}
                {todos.length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <Target className="mx-auto mb-2 opacity-20" size={48} />
                    <p>No tasks found for this day</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TodoCalendar
              calendarDate={calendarDate}
              selectedDate={selectedDate}
              onNavigate={(dir) =>
                setCalendarDate((prev) => {
                  const d = new Date(prev);
                  d.setMonth(d.getMonth() + (dir === "prev" ? -1 : 1));
                  return d;
                })
              }
              onSelectDate={setSelectedDate}
              getTodoCount={getTodoCountForDate}
            />
            <div className="p-6 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="flex items-center justify-center gap-2 mb-2 font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-[#587CF0]" /> Summary
              </h3>
              <p className="text-4xl font-black text-[#587CF0]">
                {todos.length}
              </p>
              <p className="mt-1 text-xs tracking-wider text-gray-400 uppercase">
                Tasks for today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
