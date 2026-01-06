import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  PlayCircle,
  Filter,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Target,
  Check,
} from "lucide-react";
import { toast } from "react-toastify"; // Toast 추가
import "react-toastify/dist/ReactToastify.css"; // Toast 스타일 추가
import { todosData } from "../../data/woomoonjeong/woomoonjeongData";
import { Todo } from "../../types/Woomoonjeong/woomoonjeong";
import TodoManagementCreate from "../../components/Woomoonjeong/TodoManagementPage/CreateTodoManagementModal";

const TodoManagement: React.FC = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [todos, setTodos] = useState<Todo[]>(todosData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 핵심 1: 삭제 대기 상태 관리
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);

  // 핵심 2: 삭제 대기 상태 자동 해제 (3초)
  useEffect(() => {
    if (deletePendingId !== null) {
      const timer = setTimeout(() => {
        setDeletePendingId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  /* ---------------- Utils ---------------- */

  const getStatusIcon = (status: Todo["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Todo["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const toggleTodoStatus = (todoId: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, status: getNextStatus(todo.status) }
          : todo
      )
    );
  };

  // 핵심 3: 2단계 삭제 핸들러 + Toast 알림
  const handleDeleteClick = (e: React.MouseEvent, todoId: number) => {
    e.stopPropagation(); // 카드 클릭 시 상세 페이지 이동 방지

    if (deletePendingId === todoId) {
      // 2차 클릭: 실제 삭제
      setTodos((prev) => prev.filter((t) => t.id !== todoId));
      setDeletePendingId(null);

      // Toast 알림 (우측 상단 기본값)
      toast.success("Todo가 성공적으로 삭제되었습니다.", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      // 1차 클릭: 대기 모드 진입
      setDeletePendingId(todoId);
    }
  };

  const handleOutsideClick = () => {
    if (deletePendingId) setDeletePendingId(null);
  };

  /* ---------------- Data ---------------- */

  const getTodosForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return todos.filter(
      (todo) => todo.start_date <= dateStr && todo.end_date >= dateStr
    );
  };

  const getFilteredTodos = () => {
    let filtered = getTodosForDate(selectedDate);

    if (selectedStatus !== "all") {
      filtered = filtered.filter((t) => t.status === selectedStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTodos = getFilteredTodos();
  const todayTodos = getTodosForDate(selectedDate);

  const statusCycle: Todo["status"][] = ["pending", "in-progress", "completed"];

  const getNextStatus = (current: Todo["status"]) => {
    const idx = statusCycle.indexOf(current);
    return statusCycle[(idx + 1) % statusCycle.length];
  };

  /* ---------------- Calendar ---------------- */

  const navigateMonth = (direction: "prev" | "next") => {
    setCalendarDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + (direction === "prev" ? -1 : 1));
      return d;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth() + 1,
      0
    ).getDate();

    const firstDay = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      1
    ).getDay();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        day
      );

      const todoCount = getTodosForDate(date).length;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-8 w-8 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors relative group
          ${
            isSelectedDate(date)
              ? "bg-[#587CF0] text-white"
              : isToday(date)
              ? "bg-blue-100 text-blue-700 font-medium"
              : "hover:bg-gray-100"
          }`}
        >
          {day}

          {todoCount > 0 && (
            <div
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center
              ${
                isSelectedDate(date)
                  ? "bg-white text-[#587CF0]"
                  : "bg-red-500 text-white"
              }`}
            >
              {todoCount}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50" onClick={handleOutsideClick}>
      <TodoManagementCreate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              To-do Management
            </h1>
            <p className="text-gray-600">
              Manage your learning tasks and track progress
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8]"
          >
            <Plus className="w-4 h-4" />
            Add Todo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-3">
            {/* Filters */}
            <div className="p-6 bg-white border border-purple-100 rounded-xl">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Status:
                  </span>
                  {(
                    ["all", "pending", "in-progress", "completed"] as const
                  ).map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        selectedStatus === status
                          ? "bg-[#587CF0] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {status.replace("-", " ")}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search todos..."
                    className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#587CF0]"
                  />
                </div>
              </div>
            </div>

            {/* List */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h2 className="mb-6 text-lg font-semibold text-gray-800">
                All Todos for {selectedDate.toLocaleDateString()}
              </h2>

              {filteredTodos.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  No todos found
                </div>
              )}

              <div className="space-y-4">
                {filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    onClick={() => navigate(`/woomoonjeong/todo/${todo.id}`)}
                    className={`flex items-start gap-4 p-4 transition-all duration-300 rounded-lg border-2 ${
                      deletePendingId === todo.id
                        ? "bg-red-50 border-red-200"
                        : "bg-gray-50 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(todo.status)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3
                            className={`mb-1 font-medium ${
                              deletePendingId === todo.id
                                ? "text-red-700"
                                : "text-gray-800"
                            }`}
                          >
                            {todo.name}
                          </h3>
                          <p className="max-w-md mb-2 text-sm text-gray-600 truncate">
                            {todo.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {todo.start_date} - {todo.end_date}
                              </span>
                            </div>

                            <span
                              className={`px-2 py-1 rounded-full border text-xs ${getStatusColor(
                                todo.status
                              )}`}
                            >
                              {todo.status.replace("-", " ")}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTodoStatus(todo.id);
                            }}
                            className="p-2 text-gray-400 transition-colors rounded hover:bg-white hover:text-blue-500"
                            title="Change status"
                          >
                            <PlayCircle className="w-4 h-4" />
                          </button>

                          {/* 2단계 삭제 버튼 */}
                          <button
                            onClick={(e) => handleDeleteClick(e, todo.id)}
                            className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                              deletePendingId === todo.id
                                ? "bg-red-500 text-white scale-110 shadow-md"
                                : "text-gray-400 hover:text-red-500 hover:bg-white"
                            }`}
                            title={
                              deletePendingId === todo.id
                                ? "Confirm Delete"
                                : "Delete todo"
                            }
                          >
                            {deletePendingId === todo.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-purple-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                  <Calendar className="w-4 h-4 text-[#587CF0]" />
                  Calendar
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>

                  <span className="text-sm font-medium text-gray-700 min-w-[110px] text-center">
                    {calendarDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <button
                    onClick={() => navigateMonth("next")}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="flex items-center justify-center h-8 text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            </div>

            <div className="p-6 text-center bg-white border border-purple-100 rounded-xl">
              <h3 className="flex items-center justify-center gap-2 mb-4 font-semibold text-gray-800">
                <Clock className="w-4 h-4 text-[#587CF0]" />
                Summary
              </h3>
              <p className="text-3xl font-bold text-[#587CF0]">
                {todayTodos.length}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Tasks for selected day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoManagement;
