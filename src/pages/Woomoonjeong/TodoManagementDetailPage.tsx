import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { todosData } from "../../data/woomoonjeong/woomoonjeongData";
import TodoDetailHeader from "../../components/Woomoonjeong/TodoManagementDetailPage/TodoDetailHeader";
import TodoStatusBadge from "../../components/Woomoonjeong/TodoManagementDetailPage/TodoStatusBadge";
import TodoInfoSection from "../../components/Woomoonjeong/TodoManagementDetailPage/TodoInfoSection";

export default function TodoManagementDetailPage() {
  const { todoId } = useParams<{ todoId: string }>();
  const navigate = useNavigate();

  const todo = useMemo(
    () => todosData.find((t) => t.id === todoId),
    [todoId]
  );

  const diffDays = useMemo(() => {
    if (!todo) return 0;
    const start = new Date(todo.start_date);
    const end = new Date(todo.end_date);
    return Math.ceil(
      Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [todo]);

  if (!todo) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Todo not found.</p>
        <button
          onClick={() => navigate("/woomoonjeong")}
          className="mt-4 text-blue-600 hover:underline"
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
          onEdit={() => navigate(`/woomoonjeong/todo/${todo.id}/edit`)}
        />

        <div className="p-8 space-y-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <TodoStatusBadge status={todo.status} />

          <h2 className="text-2xl font-bold text-gray-800">{todo.name}</h2>

          <TodoInfoSection label="Description">
            <p>{todo.description || "No description provided."}</p>
          </TodoInfoSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TodoInfoSection label="Start Date">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(todo.start_date).toLocaleDateString()}
              </div>
            </TodoInfoSection>
            <TodoInfoSection label="End Date">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(todo.end_date).toLocaleDateString()}
              </div>
            </TodoInfoSection>
          </div>

          <TodoInfoSection label="Duration">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {diffDays} day{diffDays !== 1 ? "s" : ""}
            </div>
          </TodoInfoSection>

          <TodoInfoSection label="Created">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {new Date(todo.created_at).toLocaleString()}
            </div>
          </TodoInfoSection>
        </div>
      </div>
    </div>
  );
}
