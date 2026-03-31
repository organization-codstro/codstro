import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { toast } from "react-toastify";
import {
  ProjectPage,
  ProjectTodo,
  Project,
  UITodo,
  NewProjectTodo,
} from "../../types/common/ProjectPlanning";

import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";
import { ProjectDetailHeader } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectDetailHeader";
import { ProjectInfoView } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectInfoView";
import { ProjectTasksSection } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTasksSection/ProjectTasksSection";
import { ProjectTodoModal } from "../../components/ProjectPlanning/ProjectInfoGeneratePage/ProjectTodoModal/ProjectTodoModal";
import { ProjectDetailService } from "../../api/ProjectPlanning/ProjectDetailPage";
import NotFoundPage from "../NotFound/NotFoundPage";
import { ProjectDetailSkeleton } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectDetailSkeleton";
import { supabase } from "../../db/supabase/supabase";
import { ProjectStatsSidebar } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectStatsSidebar";

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isPlanning, setIsPlanning] = useState(false);

  const [originalProject, setOriginalProject] = useState<Project | null>(null);
  const [originalPages, setOriginalPages] = useState<
    Array<ProjectPage & { todos: ProjectTodo[] }>
  >([]);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  const [projectTodos, setProjectTodos] = useState<UITodo[]>([]);
  const [editingTodoClientId, setEditingTodoClientId] = useState<string | null>(
    null,
  );
  const [showTodoForm, setShowTodoForm] = useState(false);

  //esc 헨들러
  useEffect(() => {
    console.log(projectId);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(`/projects`);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate, projectId]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!projectId) return;
      try {
        setIsLoading(true);

        let projectData;
        let planningFlag = false;

        try {
          projectData = await ProjectDetailService.getProjectDetail(
            projectId,
            false,
          );
        } catch {
          try {
            projectData = await ProjectDetailService.getProjectDetail(
              projectId,
              true,
            );
            planningFlag = true;
          } catch {
            toast.error("프로젝트 데이터를 불러오는중 오류가 발생하였습니다.");
            return;
          }
        }

        setOriginalProject(projectData);
        setIsPlanning(planningFlag);

        if (!planningFlag) {
          const [pagesData, todosData] = await Promise.all([
            ProjectDetailService.getProjectPagesWithTodos(projectId, false),
            ProjectDetailService.getProjectTodos(projectId),
          ]);
          setOriginalPages(pagesData as any);
          setProjectTodos(todosData);
        } else {
          const pagesData = await ProjectDetailService.getProjectPagesWithTodos(
            projectId,
            true,
          );
          setOriginalPages(pagesData as any);
        }
      } catch (error) {
        console.error(error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [projectId]);

  // ── Project Information 저장 (ProjectInfoView 내부에서 편집) ──
  const handleSaveInfo = async (updated: Project) => {
    if (!projectId) return;
    const toastId = toast.loading("저장 중입니다...");
    try {
      await ProjectDetailService.updateProjectInfo(
        projectId,
        isPlanning,
        updated,
      );
      toast.update(toastId, {
        render: "저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      setOriginalProject(updated);
    } catch {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  // ── Pages 편집 ────────────────────────────────────────────
  const handleSavePages = async (
    updatedPages: Array<ProjectPage & { todos: ProjectTodo[] }>,
  ) => {
    if (!projectId) return;
    const toastId = toast.loading("저장 중입니다...");
    try {
      await ProjectDetailService.saveProjectStructure(updatedPages as any);
      toast.update(toastId, {
        render: "저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
      setOriginalPages(updatedPages);
    } catch {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  const updatePage = (id: string, updates: any) =>
    setOriginalPages((prev) =>
      prev.map((p) => (p.project_page_id === id ? { ...p, ...updates } : p)),
    );

  const updatePageTodo = (pId: string, tId: string, updates: any) =>
    setOriginalPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId
          ? {
              ...p,
              todos: p.todos.map((t) =>
                t.id === tId ? { ...t, ...updates } : t,
              ),
            }
          : p,
      ),
    );

  const deletePageTodo = (pId: string, tId: string) =>
    setOriginalPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId
          ? { ...p, todos: p.todos.filter((t) => t.id !== tId) }
          : p,
      ),
    );

  const addPageTodo = (pId: string, newTodo: ProjectTodo) =>
    setOriginalPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId ? { ...p, todos: [...p.todos, newTodo] } : p,
      ),
    );

  // ── Project Tasks ─────────────────────────────────────────
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
    const todo = projectTodos.find((t) => t.client_id === clientId);
    if (todo?.id) {
      const merged = { ...todo, ...updates };
      ProjectDetailService.updateTodo(merged.id!, {
        todo_name: merged.name,
        todo_content: merged.content,
        todo_description: merged.description ?? "",
        todo_start_date: merged.start_date,
        todo_end_date: merged.end_date,
        todo_status: merged.status,
      }).catch(() => toast.error("Todo 업데이트에 실패했습니다."));
    }
  };

  const deleteProjectTodo = (clientId: string) => {
    const todo = projectTodos.find((t) => t.client_id === clientId);
    setProjectTodos((prev) => prev.filter((t) => t.client_id !== clientId));
    if (todo?.id) {
      ProjectDetailService.deleteTodo(todo.id).catch(() =>
        toast.error("Todo 삭제에 실패했습니다."),
      );
    }
  };

  const addProjectTodo = async (newTodo: NewProjectTodo) => {
    const { data, error } = await supabase
      .from("todos")
      .insert({
        todo_name: newTodo.name,
        todo_content: newTodo.content,
        todo_description: newTodo.description ?? "",
        todo_start_date: newTodo.start_date,
        todo_end_date: newTodo.end_date,
        todo_status: newTodo.status,
        project_id: projectId,
        project_page_id: null,
      })
      .select()
      .single();

    if (error || !data) {
      toast.error("Todo 추가에 실패했습니다.");
      return;
    }

    setProjectTodos((prev) => [
      ...prev,
      {
        id: data.todo_id,
        client_id: data.todo_id,
        name: data.todo_name,
        content: data.todo_content,
        description: data.todo_description,
        start_date: data.todo_start_date,
        end_date: data.todo_end_date,
        status: data.todo_status,
        created_at: data.created_at,
      },
    ]);
  };

  if (isLoading) return <ProjectDetailSkeleton />;
  if (!originalProject) return <NotFoundPage />;

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <ProjectDetailHeader
        project={originalProject}
        onBack={() => navigate("/projects")}
        onContinuePlanning={() =>
          navigate("/projects/new", {
            state: { projectId: originalProject.project_id },
          })
        }
      />

      <div className="p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left: 기본 정보 & 페이지 구성 */}
          <div className="space-y-6">
            {/* Project Information */}
            <ProjectInfoView
              project={originalProject}
              onSave={handleSaveInfo}
              isPlanning={isPlanning}
            />

            {/* Pages 섹션 */}
            {!isPlanning && projectId && (
              <ProjectPagesSection
                projectId={projectId}
                pages={originalPages}
                expandedPage={expandedPage}
                setExpandedPage={setExpandedPage}
                getStatusColor={getStatusColor}
                onUpdatePage={updatePage}
                onUpdateTodo={updatePageTodo}
                onDeleteTodo={deletePageTodo}
                onAddTodo={addPageTodo}
                onSave={handleSavePages}
              />
            )}

            {/* 기획 중 안내 */}
            {isPlanning && (
              <div className="p-6 border border-orange-200 rounded-lg bg-orange-50">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-orange-900">
                      Project Planning in Progress
                    </h3>
                    <p className="mt-1 text-sm text-orange-700">
                      This project is currently in the planning phase.
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          const stage =
                            await ProjectDetailService.getProjectPlanningStage(
                              originalProject.project_id,
                            );
                          const path =
                            stage === "chat"
                              ? "/projects/new/chat"
                              : "/projects/new/info";
                          navigate(path, {
                            state: { projectId: originalProject.project_id },
                          });
                        } catch {
                          toast.error("기획 단계를 불러오는데 실패했습니다.");
                        }
                      }}
                      className="px-4 py-2 mt-3 text-sm font-medium text-white rounded-lg bg-[#587CF0]"
                    >
                      Continue Planning
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right 컬럼 */}
          <div className="space-y-6">
            <ProjectStatsSidebar
              todos={projectTodos}
              isPlanning={isPlanning}
              onNewMeeting={() =>
                navigate(`/projects/${projectId}/meetings/new`)
              }
              onViewMeetings={() => navigate(`/projects/${projectId}/meetings`)}
            />

            {/* Right: Project Tasks */}
            {!isPlanning && (
              <ProjectTasksSection
                projectTodos={projectTodos}
                editingTodoClientId={editingTodoClientId}
                setEditingTodoClientId={setEditingTodoClientId}
                getStatusColor={getStatusColor}
                updateProjectTodo={updateProjectTodo}
                deleteProjectTodo={deleteProjectTodo}
                onAddClick={() => setShowTodoForm(true)}
              />
            )}
          </div>
        </div>
      </div>

      <ProjectTodoModal
        isOpen={showTodoForm}
        onClose={() => setShowTodoForm(false)}
        onAdd={addProjectTodo}
      />
    </div>
  );
}
