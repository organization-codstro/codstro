import { useState } from "react";
import { Todo, ProjectPage } from "../../types/ProjectPlanning/project";
import {
  pagesData,
  projectTodosData,
} from "../../data/ProjectPlanning/project";
import { useNavigate } from "react-router-dom";
import { ProjectBasicInfoSection } from "../../components/ProjectPlanning/ProjectBasicInfoSection";
import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection";
import { ProjectTasksSection } from "../../components/ProjectPlanning/ProjectTasksSection";
import { ProjectTodoModal } from "../../components/ProjectPlanning/ProjectTodoModal";
import { ProjectHeaderSection } from "../../components/ProjectPlanning/ProjectHeaderSection";
import { ProjectFooterActions } from "../../components/ProjectPlanning/ProjectFooterActions";

export default function ProjectInfoGenerate() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("AI Chat App");
  const [projectTopic, setProjectTopic] = useState(
    "Real-time messaging application"
  );
  const [projectDescription, setProjectDescription] = useState(
    "A modern chat application with AI integration"
  );
  const [mainColor, setMainColor] = useState("#587CF0");
  const [designStyle, setDesignStyle] = useState("Modern, minimalist");
  const [projectEffect, setProjectEffect] = useState(
    "Smooth transitions, fade animations"
  );
  const [startDate, setStartDate] = useState("2025-12-25");
  const [endDate, setEndDate] = useState("2026-03-25");
  const [expandedPage, setExpandedPage] = useState<number | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [showTodoForm, setShowTodoForm] = useState(false);

  const [projectTodos, setProjectTodos] = useState<Todo[]>(projectTodosData);

  const [pages, setPages] =
    useState<Array<ProjectPage & { todos: Todo[] }>>(pagesData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-500";
      case "in progress":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  const updateProjectTodo = (todoId: number, updates: Partial<Todo>) => {
    setProjectTodos((prev) =>
      prev.map((todo) =>
        todo.todo_id === todoId ? { ...todo, ...updates } : todo
      )
    );
    setEditingTodoId(null);
  };

  const deleteProjectTodo = (todoId: number) => {
    setProjectTodos((prev) => prev.filter((todo) => todo.todo_id !== todoId));
  };

  const addProjectTodo = (newTodo: Todo) => {
    setProjectTodos((prev) => [...prev, newTodo]);
    setShowTodoForm(false);
  };

  const handleCreateProject = () => {
    // TODO: API 연동
    navigate("/projects"); // 생성 후 이동
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <ProjectHeaderSection />

      <div className="p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <ProjectBasicInfoSection
              projectName={projectName}
              setProjectName={setProjectName}
              projectTopic={projectTopic}
              setProjectTopic={setProjectTopic}
              projectDescription={projectDescription}
              setProjectDescription={setProjectDescription}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              mainColor={mainColor}
              setMainColor={setMainColor}
              designStyle={designStyle}
              setDesignStyle={setDesignStyle}
              projectEffect={projectEffect}
              setProjectEffect={setProjectEffect}
            />

            <ProjectPagesSection
              pages={pages}
              expandedPage={expandedPage}
              setExpandedPage={setExpandedPage}
              getStatusColor={getStatusColor}
            />
          </div>

          {/* Right */}
          <ProjectTasksSection
            projectTodos={projectTodos}
            editingTodoId={editingTodoId}
            setEditingTodoId={setEditingTodoId}
            getStatusColor={getStatusColor}
            updateProjectTodo={updateProjectTodo}
            deleteProjectTodo={deleteProjectTodo}
            onAddClick={() => setShowTodoForm(true)}
          />
        </div>

        {/* Footer */}
        <ProjectFooterActions
          onBack={() => navigate("/projects/new")}
          onSubmit={handleCreateProject}
        />
      </div>

      <ProjectTodoModal
        isOpen={showTodoForm}
        onClose={() => setShowTodoForm(false)}
        onAdd={addProjectTodo}
      />
    </div>
  );
}
