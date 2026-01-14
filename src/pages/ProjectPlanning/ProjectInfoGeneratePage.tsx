import { useState, useEffect } from "react";
import {
  Todo,
  ProjectPage,
  ProjectBasicInfo,
} from "../../types/pages/ProjectPlanning/project";
import {
  pagesData,
  projectTodosData,
} from "../../data/ProjectPlanning/project";
import { useNavigate, useLocation } from "react-router-dom";
import { ProjectBasicInfoSection } from "../../components/ProjectPlanning/ProjectBasicInfoSection";
import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";
import { ProjectTasksSection } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTasksSection/ProjectTasksSection";
import { ProjectHeaderSection } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectHeaderSection";
import { ProjectFooterActions } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectFooterActions";
import { ProjectTodoModal } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTodoModal/ProjectTodoModal";

export default function ProjectInfoGeneratePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const basicInfo = (location.state as { basicInfo?: ProjectBasicInfo })
    ?.basicInfo;

  useEffect(() => {
    // 이전 단계 데이터가 없으면 첫 단계로 리다이렉트
    if (!basicInfo) {
      navigate("/projects/new", { replace: true });
    }
  }, [basicInfo, navigate]);

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
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
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

  const updateProjectTodo = (todoId: string, updates: Partial<Todo>) => {
    setProjectTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? { ...todo, ...updates } : todo))
    );
    setEditingTodoId(null);
  };

  const deleteProjectTodo = (todoId: string) => {
    setProjectTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  const addProjectTodo = (newTodo: Todo) => {
    setProjectTodos((prev) => [...prev, newTodo]);
    setShowTodoForm(false);
  };

  const updatePage = (
    pageId: string,
    updates: Partial<ProjectPage & { todos: Todo[] }>
  ) => {
    setPages((prev) =>
      prev.map((page) =>
        page.project_page_id === pageId ? { ...page, ...updates } : page
      )
    );
  };

  const updatePageTodo = (
    pageId: string,
    todoId: string,
    updates: Partial<Todo>
  ) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.project_page_id === pageId) {
          return {
            ...page,
            todos: page.todos.map((todo) =>
              todo.id === todoId ? { ...todo, ...updates } : todo
            ),
          };
        }
        return page;
      })
    );
  };

  const deletePageTodo = (pageId: string, todoId: string) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.project_page_id === pageId) {
          return {
            ...page,
            todos: page.todos.filter((todo) => todo.id !== todoId),
          };
        }
        return page;
      })
    );
  };

  const addPageTodo = (pageId: string, newTodo: Todo) => {
    setPages((prev) =>
      prev.map((page) => {
        if (page.project_page_id === pageId) {
          return {
            ...page,
            todos: [...page.todos, newTodo],
          };
        }
        return page;
      })
    );
  };

  const handleCreateProject = () => {
    // TODO: API 연동
    navigate("/projects"); // 생성 후 이동
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <ProjectHeaderSection
        title="Create New Project"
        subtitle="Step 3: Review and edit project details"
      />

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
              onUpdatePage={updatePage}
              onUpdateTodo={updatePageTodo}
              onDeleteTodo={deletePageTodo}
              onAddTodo={addPageTodo}
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
          onSave={() => {
            //todo : 저장하고 나가기 api 연결
            navigate("/projects");
          }}
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
