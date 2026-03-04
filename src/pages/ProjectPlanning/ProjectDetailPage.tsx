import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { toast } from "react-toastify";
import {
  ProjectPage,
  ProjectTodo,
  Project,
} from "../../types/common/projectPlanning";

// 컴포넌트 임포트
import { ProjectBasicInfoSection } from "../../components/ProjectPlanning/ProjectBasicInfoSection";
import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";
import { ProjectDetailHeader } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectDetailHeader";
import { ProjectInfoView } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectInfoView";
import { ProjectPagesView } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectPagesView";
import { ProjectStatsSidebar } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectStatsSidebar";
import { ProjectDetailService } from "../../api/ProjectPlanning/ProjectDetailPage";

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // 1. 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false); // 상태 구분을 위한 state 추가

  const [originalProject, setOriginalProject] = useState<Project | null>(null);
  const [originalPages, setOriginalPages] = useState<
    Array<ProjectPage & { todos: ProjectTodo[] }>
  >([]);

  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [editedPages, setEditedPages] = useState<
    Array<ProjectPage & { todos: ProjectTodo[] }>
  >([]);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  // 2. 생명주기 (useEffect): 데이터 로드
  useEffect(() => {
    const fetchAllData = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        const idNum = parseInt(projectId);

        // 1) 프로젝트 상세 정보 조회 (기본적으로 active로 시도 후 에러 시 planning 확인 로직 또는 이전 페이지 state 활용)
        // 여기서는 URL 파라미터나 전역 상태 등으로 isPlanning 여부를 알 수 있다고 가정하거나 두 곳 다 체크합니다.
        let projectData;
        let planningFlag = false;

        try {
          projectData = await ProjectDetailService.getProjectDetail(
            idNum,
            false,
          );
        } catch (e) {
          projectData = await ProjectDetailService.getProjectDetail(
            idNum,
            true,
          );
          planningFlag = true;
        }

        setOriginalProject(projectData);
        setIsPlanning(planningFlag);

        // 2) 페이지 및 Todo 로드 (active 상태일 때 주로 로드)
        if (!planningFlag) {
          const pagesData =
            await ProjectDetailService.getProjectPagesWithTodos(idNum);
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

  // 3. 편집 모드 핸들러
  const handleEdit = () => {
    setEditedProject(originalProject);
    setEditedPages(originalPages);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!projectId || !editedProject) return;

    const toastId = toast.loading("변경 사항을 저장하고 있습니다...");
    try {
      const idNum = parseInt(projectId);

      // 1) 기본 정보 저장
      await ProjectDetailService.updateProjectInfo(
        idNum,
        isPlanning,
        editedProject,
      );

      // 2) 페이지 구조 저장
      await ProjectDetailService.saveProjectStructure(editedPages as any);

      toast.update(toastId, {
        render: "성공적으로 저장되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // 데이터 갱신
      setOriginalProject(editedProject);
      setOriginalPages(editedPages);
      setIsEditing(false);
    } catch (error) {
      toast.update(toastId, {
        render: "저장에 실패했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // 4. 데이터 업데이트 헬퍼 (기존 로직 유지하되 state만 edited로 변경)
  const updatePage = (id: string, updates: any) =>
    setEditedPages((prev) =>
      prev.map((p) => (p.project_page_id === id ? { ...p, ...updates } : p)),
    );

  const updatePageTodo = (pId: string, tId: string, updates: any) =>
    setEditedPages((prev) =>
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

  const deletePageTodo = async (pId: string, tId: string) => {
    // 실제 DB 삭제는 save 시점 혹은 즉시 삭제 선택 가능 (규칙에 따라 2단계 확정 권장)
    setEditedPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId
          ? { ...p, todos: p.todos.filter((t) => t.id !== tId) }
          : p,
      ),
    );
  };

  const addPageTodo = (pId: string, newTodo: ProjectTodo) =>
    setEditedPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId ? { ...p, todos: [...p.todos, newTodo] } : p,
      ),
    );

  const updateProjectField = (field: keyof Project, value: any) =>
    editedProject && setEditedProject({ ...editedProject, [field]: value });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        Loading project details...
      </div>
    );
  }

  if (!originalProject) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Project not found
          </h2>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-2 mt-4 font-medium text-white rounded-lg bg-[#587CF0]"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const project = isEditing ? editedProject! : originalProject;
  const pages = isEditing ? editedPages : originalPages;

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <ProjectDetailHeader
        project={project}
        isEditing={isEditing}
        onBack={() => navigate("/projects")}
        onContinuePlanning={() =>
          navigate("/projects/new", {
            state: { projectId: project.project_id },
          })
        }
        onEdit={handleEdit}
        onCancel={() => setIsEditing(false)}
        onSave={handleSave}
      />

      <div className="p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {isEditing ? (
              <ProjectBasicInfoSection
                projectName={editedProject?.project_name || ""}
                setProjectName={(v) => updateProjectField("project_name", v)}
                projectTopic={editedProject?.project_topic || ""}
                setProjectTopic={(v) => updateProjectField("project_topic", v)}
                projectDescription={editedProject?.project_description || ""}
                setProjectDescription={(v) =>
                  updateProjectField("project_description", v)
                }
                startDate={editedProject?.project_start_date || ""}
                setStartDate={(v) =>
                  updateProjectField("project_start_date", v)
                }
                endDate={editedProject?.project_end_date || ""}
                setEndDate={(v) => updateProjectField("project_end_date", v)}
                mainColor={editedProject?.project_main_color || "#587CF0"}
                setMainColor={(v) =>
                  updateProjectField("project_main_color", v)
                }
                designStyle={editedProject?.project_style || ""}
                setDesignStyle={(v) => updateProjectField("project_style", v)}
                projectEffect={editedProject?.project_effect || ""}
                setProjectEffect={(v) =>
                  updateProjectField("project_effect", v)
                }
              />
            ) : (
              <ProjectInfoView project={project} />
            )}

            {!isPlanning &&
              (isEditing ? (
                <ProjectPagesSection
                  pages={pages}
                  expandedPage={expandedPage}
                  setExpandedPage={setExpandedPage}
                  getStatusColor={(status) =>
                    status === "done"
                      ? "bg-green-500"
                      : status === "in progress"
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                  }
                  onUpdatePage={updatePage}
                  onUpdateTodo={updatePageTodo}
                  onDeleteTodo={deletePageTodo}
                  onAddTodo={addPageTodo}
                />
              ) : (
                <ProjectPagesView pages={pages} />
              ))}

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
                      onClick={() =>
                        navigate("/projects/new", {
                          state: { projectId: project.project_id },
                        })
                      }
                      className="px-4 py-2 mt-3 text-sm font-medium text-white rounded-lg bg-[#587CF0]"
                    >
                      Continue Planning
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <ProjectStatsSidebar
            project={project}
            todos={pages.flatMap((p) => p.todos)} // Sidebar를 위해 모든 Todo 취합
            isPlanning={isPlanning}
            onNewMeeting={() =>
              navigate(`/projects/meetings/new`, {
                state: { projectId: project.project_id },
              })
            }
            onViewMeetings={() =>
              navigate(`/projects/meetings`, {
                state: { projectId: project.project_id },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
