import React, { useState } from "react";
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
} from "lucide-react";
import { todosData } from "../../data/woomoonjeong/woomoonjeongData";
import { Todo } from "../../types/Woomoonjeong/woomoonjeong";

const TodoListPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [todos, setTodos] = useState<Todo[]>(todosData);

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

    // empty cells
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

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen p-8 bg-gray-50">
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
            onClick={() => navigate("/woomoonjeong/todos/new")}
            className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8]"
          >
            <Plus className="w-4 h-4" />
            Add Todo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main */}
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
                    className="px-3 py-1 border rounded-lg"
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
                    className="flex items-start gap-4 p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    {/* ✅ 상태 아이콘 영역 (위치 보정) */}
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(todo.status)}
                    </div>

                    {/* ✅ 내용 영역 */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-1 font-medium text-gray-800">
                            {todo.name}
                          </h3>

                          <p className="mb-2 text-sm text-gray-600">
                            {todo.description}
                          </p>

                          {/* ✅ 메타 정보 라인 */}
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

                        {/* ✅ 우측 액션 버튼 */}
                        <div className="flex flex-col gap-1 ml-4">
                          {/* 상태 변경 */}
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

                          {/* 삭제 */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("todo가 삭제 되었습니다.");
                            }}
                            className="p-2 text-gray-400 transition-colors rounded hover:bg-white hover:text-red-500"
                            title="Delete todo"
                          >
                            <Trash2 className="w-4 h-4" />
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
            {/* Calendar */}
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

              {/* Day headers */}
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

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            </div>

            {/* Summary */}
            <div className="p-6 bg-white border border-purple-100 rounded-xl">
              <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800">
                <Clock className="w-4 h-4 text-[#587CF0]" />
                Selected Date Summary
              </h3>

              <p className="text-2xl font-bold text-center">
                {todayTodos.length}
              </p>
              <p className="text-sm text-center text-gray-500">
                {todayTodos.length !== 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
