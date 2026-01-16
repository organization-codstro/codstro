import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Todo,
  ProjectPage,
  ProjectBasicInfo,
  newTodo,
  UITodo,
} from "../../types/pages/ProjectPlanning/project";

// 컴포넌트 임포트
import { ProjectBasicInfoSection } from "../../components/ProjectPlanning/ProjectBasicInfoSection";
import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";
import { ProjectTasksSection } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTasksSection/ProjectTasksSection";
import { ProjectHeaderSection } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectHeaderSection";
import { ProjectFooterActions } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectFooterActions";
import { ProjectTodoModal } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTodoModal/ProjectTodoModal";
import { ProjectInfoGenerateService } from "../../api/ProjectPlanning/ProjectInfoGeneratePage";
import { SavePlanningDraftParams } from "../../types/api/ProjectPlanning/ProjectInfoGeneratePage";

export default function ProjectInfoGeneratePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 이전 단계에서 넘어온 데이터 확인
  const { basicInfo, projectId } =
    (location.state as { basicInfo?: ProjectBasicInfo; projectId?: string }) ||
    {};

  // 2. 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 프로젝트 기본 정보
  const [projectName, setProjectName] = useState("AI Chat App");
  const [projectTopic, setProjectTopic] = useState(
    basicInfo?.project_topic || ""
  );
  const [projectDescription, setProjectDescription] = useState(
    basicInfo?.desired_features || ""
  );
  const [mainColor, setMainColor] = useState("#587CF0");
  const [designStyle, setDesignStyle] = useState("Modern, minimalist");
  const [projectEffect, setProjectEffect] = useState("Smooth transitions");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");

  // 상세 구조 (페이지 및 할 일)
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [editingTodoClientId, setEditingTodoClientId] = useState<string | null>(
    null
  );
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [projectTodos, setProjectTodos] = useState<UITodo[]>([]);
  const [pages, setPages] = useState<Array<ProjectPage & { todos: Todo[] }>>(
    []
  );

  useEffect(() => {
    if (!basicInfo || !projectId) {
      toast.error("비정상적인 접근입니다.");
      navigate("/projects/new", { replace: true });
    }
    // TODO: 초기 진입 시 AI가 생성한 초안이 있다면 API로 받아와서 setPages, setProjectTodos 수행
  }, [basicInfo, projectId, navigate]);

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
          id: t.id,
          project_id: projectId!,
          project_page_id: page.project_page_id,
          project_todo_content: t.content, // content -> project_todo_content
          project_todo_status: t.status,
        })),
      })),

      projectTodos: projectTodos.map((t) => ({
        id: t.id, // 있으면 update, 없으면 insert
        project_id: projectId!,
        project_todo_content: t.content,
        project_todo_status: t.status,
      })),
    };
  };

  // 4. 중간 저장 핸들러
  const handleSaveDraft = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading("기획안을 임시 저장 중입니다...");

    try {
      await ProjectInfoGenerateService.savePlanningDraft(getSaveParams());
      toast.update(toastId, {
        render: "임시 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate("/projects");
    } catch (error) {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
      });

      toast.update(toastId, {
        render: "프로젝트가 생성되었습니다!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate(`/projects/${newProject.project_id}`);
    } catch (error) {
      toast.update(toastId, {
        render: "프로젝트 생성에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 기존 데이터 조작 로직 (유지) ---
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
      prev.map((t) => (t.client_id === clientId ? { ...t, ...updates } : t))
    );
  };

  const deleteProjectTodo = (todoId: string) => {
    setProjectTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  const addProjectTodo = (todo: newTodo) => {
    const uiTodo: UITodo = {
      ...todo,
      client_id: crypto.randomUUID(), // UI 전용
    };

    setProjectTodos((prev) => [...prev, uiTodo]);
  };
  const updatePage = (pageId: string, updates: Partial<ProjectPage>) => {
    setPages((prev) =>
      prev.map((p) => (p.project_page_id === pageId ? { ...p, ...updates } : p))
    );
  };

  const updatePageTodo = (
    pageId: string,
    todoId: string,
    updates: Partial<Todo>
  ) => {
    setPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? {
              ...p,
              todos: p.todos.map((t) =>
                t.id === todoId ? { ...t, ...updates } : t
              ),
            }
          : p
      )
    );
  };

  const deletePageTodo = (pageId: string, todoId: string) => {
    setPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? { ...p, todos: p.todos.filter((t) => t.id !== todoId) }
          : p
      )
    );
  };

  const addPageTodo = (pageId: string, newTodo: Todo) => {
    setPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? { ...p, todos: [...p.todos, newTodo] }
          : p
      )
    );
  };

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
    </div>
  );
}
