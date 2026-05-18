import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ProjectPage,
  UITodo,
  ProjectTodo,
  NewProjectTodo,
} from "../../types/common/ProjectPlanning";

// 컴포넌트 임포트
import { ProjectBasicInfoSection } from "../../components/ProjectPlanning/ProjectBasicInfoSection";
import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";
import { ProjectTasksSection } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTasksSection/ProjectTasksSection";
import { ProjectHeaderSection } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectHeaderSection";
import { ProjectFooterActions } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectFooterActions";
import { ProjectTodoModal } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTodoModal/ProjectTodoModal";
import { ProjectInfoGenerateService } from "../../api/ProjectPlanning/ProjectInfoGeneratePage";
import { SavePlanningDraftParams } from "../../types/api/ProjectPlanning/ProjectInfoGeneratePage";
import { getKSTDateString } from "../../utils/date/getKSTDateString";
import { SaveDraftWarningModal } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/SaveDraftWarningModal";
import { NotFoundPage } from "../NotFound/NotFoundPage";
import { GeneratedTodo } from "../../types/api/ProjectPlanning/ProjectCreateChatPage";

export default function ProjectInfoGeneratePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 이전 단계에서 넘어온 데이터 확인
  const { projectId, todos } =
    (location.state as {
      projectId?: string;
      todos?: GeneratedTodo[];
    }) || {};
    
  // 2. 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 프로젝트 기본 정보
  const [projectName, setProjectName] = useState("");
  const [projectTopic, setProjectTopic] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [mainColor, setMainColor] = useState("#587CF0");
  const [designStyle, setDesignStyle] = useState("Modern, minimalist");
  const [projectEffect, setProjectEffect] = useState("Smooth transitions");
  const [startDate, setStartDate] = useState(getKSTDateString(0));
  const [endDate, setEndDate] = useState(getKSTDateString(1));

  // 상세 구조 (페이지 및 할 일)
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [editingTodoClientId, setEditingTodoClientId] = useState<string | null>(
    null,
  );
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [showSaveDraftWarning, setShowSaveDraftWarning] = useState(false);
  const [projectTodos, setProjectTodos] = useState<UITodo[]>([]);
  const [pages, setPages] = useState<
    Array<ProjectPage & { todos: ProjectTodo[] }>
  >([]);

  //todos → UI 변환 useEffect
  useEffect(() => {
    if (!todos || todos.length === 0) return;

    const mapped: UITodo[] = todos.map((t) => ({
      id: crypto.randomUUID(),
      client_id: crypto.randomUUID(),
      name: t.todo_name,
      content: t.todo_content,
      description: t.todo_description ?? "",
      start_date: t.todo_start_date,
      end_date: t.todo_end_date,
      status: t.todo_status,
    }));

    setProjectTodos(mapped);
  }, [todos]);

  //창 닫을때 프로젝트 todo가 소실되니 이를 경고하기 위한 이벤트 등록
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!projectId) {
      toast.error("비정상적인 접근입니다.");
      navigate("/projects/new", { replace: true });
      return;
    }

    const loadPlanningData = async () => {
      try {
        // project_plannings 테이블에서 기본 정보 조회
        // 아래 함수는 기존 ProjectInfoGenerateService 또는 별도 API 함수로 구현
        const data =
          await ProjectInfoGenerateService.getPlanningDetail(projectId);

        setProjectName(data.project_name ?? "");
        setProjectTopic(data.project_topic ?? "");
        setProjectDescription(data.project_description ?? "");
        setMainColor(data.project_main_color ?? "#587CF0");
        setDesignStyle(data.project_style ?? "");
        setProjectEffect(data.project_effect ?? "");
        setStartDate(data.project_start_date ?? getKSTDateString(0));
        setEndDate(data.project_end_date ?? getKSTDateString(1));

        // pages & todos가 있다면 함께 세팅
        if (data.pages) {
          setPages(data.pages);
        }
      } catch (e) {
        toast.error("프로젝트 정보를 불러오는데 실패했습니다.");
        navigate("/projects/new", { replace: true });
      }
    };

    loadPlanningData();
  }, [projectId, navigate]);

  // 3. 공통 저장 데이터 생성 헬퍼
  // 3. 공통 저장 데이터 생성 헬퍼 (필드명 매핑 추가)
  const getSaveParams = (): SavePlanningDraftParams => {
    return {
      projectId: projectId!,
      basicInfo: {
        project_name: projectName,
        project_topic: projectTopic,
        project_description: projectDescription,
        project_start_date: startDate,
        project_end_date: endDate,
        project_main_color: mainColor,
        project_style: designStyle,
        project_effect: projectEffect,
      },
      // UI용 pages 배열을 DB용(ProjectPageResponse)으로 변환
      pages: pages.map((page) => ({
        project_page_id: page.project_page_id,
        project_id: projectId!,
        project_page_name: page.project_page_name,
        project_page_role: page.project_page_role,
        project_page_function: page.project_page_function,
        project_page_is_complete: page.project_page_is_complete,
        // 내부의 todos도 변환
        todos: page.todos.map((t) => ({
          todo_id: t.id,
          todo_name: t.name,
          todo_content: t.content,
          todo_description: t.description ?? "",
          todo_start_date: t.start_date,
          todo_end_date: t.end_date,
          todo_status: t.status,
        })),
      })),

      projectTodos: projectTodos.map((t) => ({
        todo_id: t.id,
        todo_name: t.name,
        todo_content: t.content,
        todo_description: t.description ?? "",
        todo_start_date: t.start_date,
        todo_end_date: t.end_date,
        todo_status: t.status,
      })),
    };
  };

  const executeSaveDraft = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading("기획안을 임시 저장 중입니다...");
    try {
      await ProjectInfoGenerateService.savePlanningDraft(getSaveParams());
      toast.update(toastId, {
        render: "임시 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      navigate("/projects");
    } catch (error) {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. 중간 저장 핸들러
  const handleSaveDraft = async () => {
    if (projectTodos.length > 0) {
      setShowSaveDraftWarning(true);
      return;
    }
    await executeSaveDraft();
  };

  // 5. 최종 프로젝트 생성 (Active 전환)
  const handleFinalizeProject = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading("프로젝트를 생성하고 있습니다...");

    try {
      // 먼저 현재 상태를 draft로 저장하여 데이터 정합성 확보
      await ProjectInfoGenerateService.savePlanningDraft(getSaveParams());
      // 정식 프로젝트로 전환
      const newProject = await ProjectInfoGenerateService.finalizeProject({
        projectId: projectId!,
        pages: getSaveParams().pages,
        projectTodos: getSaveParams().projectTodos,
      });

      toast.update(toastId, {
        render: "프로젝트가 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      navigate(`/projects/${newProject.project_id}`);
    } catch (error) {
      toast.update(toastId, {
        render: "프로젝트 생성에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 기존 데이터 조작 로직 ---
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

  const updateProjectTodo = (clientId: string, updates: Partial<UITodo>) => {
    setProjectTodos((prev) =>
      prev.map((t) => (t.client_id === clientId ? { ...t, ...updates } : t)),
    );
  };

  const deleteProjectTodo = (todoId: string) => {
    setProjectTodos((prev) => prev.filter((t) => t.client_id !== todoId));
  };

  const addProjectTodo = (todo: NewProjectTodo) => {
    const uiTodo: UITodo = {
      ...todo,
      id: crypto.randomUUID(),
      client_id: crypto.randomUUID(), // UI 전용
    };

    setProjectTodos((prev) => [...prev, uiTodo]);
  };
  const updatePage = (pageId: string, updates: Partial<ProjectPage>) => {
    setPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId ? { ...p, ...updates } : p,
      ),
    );
  };

  const updatePageTodo = (
    pageId: string,
    todoId: string,
    updates: Partial<ProjectTodo>,
  ) => {
    setPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? {
              ...p,
              todos: p.todos.map((t) =>
                t.id === todoId ? { ...t, ...updates } : t,
              ),
            }
          : p,
      ),
    );
  };

  const deletePageTodo = (pageId: string, todoId: string) => {
    setPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? { ...p, todos: p.todos.filter((t) => t.id !== todoId) }
          : p,
      ),
    );
  };

  const addPageTodo = (pageId: string, newTodo: ProjectTodo) => {
    setPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? { ...p, todos: [...p.todos, newTodo] }
          : p,
      ),
    );
  };

  const addPage = () => {
    const newPage: ProjectPage & { todos: ProjectTodo[] } = {
      project_page_id: crypto.randomUUID(),
      project_page_name: "New Page",
      project_page_role: "",
      project_page_function: "",
      project_page_is_complete: false,
      project_id: projectId!,
      todos: [],
    };
    setPages((prev) => [...prev, newPage]);
  };

  const deletePage = (pageId: string) => {
    setPages((prev) => prev.filter((p) => p.project_page_id !== pageId));
  };

  if (!projectId) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <ProjectHeaderSection
        title="Create New Project"
        subtitle="Step 3: Review and edit project details"
      />

      <div className="p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: 기본 정보 & 페이지 구성 */}
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
              projectId={projectId}
              pages={pages}
              expandedPage={expandedPage}
              setExpandedPage={setExpandedPage}
              getStatusColor={getStatusColor}
              onUpdatePage={updatePage}
              onUpdateTodo={updatePageTodo}
              onDeleteTodo={deletePageTodo}
              onAddTodo={addPageTodo}
              onAddPage={addPage}
              onDeletePage={deletePage}
            />
          </div>

          {/* Right: 프로젝트 전체 할 일 */}
          <ProjectTasksSection
            projectTodos={projectTodos}
            editingTodoClientId={editingTodoClientId}
            setEditingTodoClientId={setEditingTodoClientId}
            getStatusColor={getStatusColor}
            updateProjectTodo={updateProjectTodo}
            deleteProjectTodo={deleteProjectTodo}
            onAddClick={() => setShowTodoForm(true)}
          />
        </div>

        {/* Footer Actions */}
        <ProjectFooterActions
          onSave={handleSaveDraft}
          onSubmit={handleFinalizeProject}
          disabled={isSubmitting}
        />
      </div>

      <ProjectTodoModal
        isOpen={showTodoForm}
        onClose={() => setShowTodoForm(false)}
        onAdd={addProjectTodo}
      />

      <SaveDraftWarningModal
        isOpen={showSaveDraftWarning}
        todoCount={projectTodos.length}
        onConfirm={() => {
          setShowSaveDraftWarning(false);
          executeSaveDraft();
        }}
        onClose={() => setShowSaveDraftWarning(false)}
      />
    </div>
  );
}
