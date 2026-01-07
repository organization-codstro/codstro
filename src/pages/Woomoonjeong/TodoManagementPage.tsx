import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Filter, Search, Target, Clock } from "lucide-react";
import { todosData } from "../../data/woomoonjeong/woomoonjeongData";
import { Todo } from "../../types/Woomoonjeong/woomoonjeong";
import TodoManagementCreate from "../../components/Woomoonjeong/TodoManagementPage/CreateTodoManagementModal";
import TodoManagementHeader from "../../components/Woomoonjeong/TodoManagementPage/TodoManagementHeader";
import TodoCard from "../../components/Woomoonjeong/TodoManagementPage/TodoCard";
import TodoCalendar from "../../components/Woomoonjeong/TodoManagementPage/TodoCalendar";

const TodoManagement: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>(todosData);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);

  useEffect(() => {
    if (deletePendingId) {
      const timer = setTimeout(() => setDeletePendingId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePendingId]);

  const getTodosForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return todos.filter(
      (t) => t.start_date <= dateStr && t.end_date >= dateStr
    );
  };

  const filteredTodos = useMemo(() => {
    let result = getTodosForDate(selectedDate);
    if (selectedStatus !== "all")
      result = result.filter((t) => t.status === selectedStatus);
    if (searchQuery)
      result = result.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return result;
  }, [todos, selectedDate, selectedStatus, searchQuery]);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (deletePendingId === id) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setDeletePendingId(null);
      toast.success("Todo deleted");
    } else {
      setDeletePendingId(id);
    }
  };

  return (
    <div
      className="min-h-screen p-8 bg-gray-50"
      onClick={() => setDeletePendingId(null)}
    >
      <TodoManagementCreate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedStatus === s
                      ? "bg-[#587CF0] text-white"
                      : "bg-gray-100"
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
            <div className="p-6 bg-white border border-purple-100 rounded-xl">
              <h2 className="mb-6 text-lg font-semibold">
                Todos for {selectedDate.toLocaleDateString()}
              </h2>
              <div className="space-y-4">
                {filteredTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    isDeletePending={deletePendingId === todo.id}
                    onNavigate={() => navigate(`/woomoonjeong/todo/${todo.id}`)}
                    onToggleStatus={(e) => {
                      e.stopPropagation(); /* status toggle logic */
                    }}
                    onDeleteClick={(e) => handleDelete(e, todo.id)}
                  />
                ))}
                {filteredTodos.length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <Target className="mx-auto mb-2" />
                    No todos found
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
              getTodoCount={(d) => getTodosForDate(d).length}
            />
            <div className="p-6 text-center bg-white border border-purple-100 rounded-xl">
              <h3 className="flex items-center justify-center gap-2 mb-2 font-semibold">
                <Clock className="w-4 h-4 text-[#587CF0]" /> Summary
              </h3>
              <p className="text-3xl font-bold text-[#587CF0]">
                {getTodosForDate(selectedDate).length}
              </p>
              <p className="text-sm text-gray-500">Tasks for selected day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoManagement;
