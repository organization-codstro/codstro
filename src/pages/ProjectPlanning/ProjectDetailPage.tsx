import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import {
  ProjectPage,
  Todo,
  Project,
} from "../../types/pages/ProjectPlanning/project";
import {
  activeProjectsData,
  planningProjectsData,
  pagesData,
  projectTodosData,
} from "../../data/ProjectPlanning/project";
import { ProjectBasicInfoSection } from "../../components/ProjectPlanning/ProjectBasicInfoSection";
import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection";
import { ProjectDetailHeader } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectDetailHeader";
import { ProjectInfoView } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectInfoView";
import { ProjectPagesView } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectPagesView";
import { ProjectStatsSidebar } from "../../components/ProjectPlanning/ProjectDetailPage/ProjectStatsSidebar";

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const allProjects = [...activeProjectsData, ...planningProjectsData];
  const originalProject = allProjects.find(
    (p) => p.project_id === Number(projectId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(
    originalProject || null
  );
  const [editedPages, setEditedPages] = useState<
    Array<ProjectPage & { todos: Todo[] }>
  >([]);
  const [expandedPage, setExpandedPage] = useState<number | null>(null);

  const project = isEditing ? editedProject : originalProject;
  const isPlanning = project?.project_status === "planning";
  const isActive = project?.project_status === "active";

  const originalPages: Array<ProjectPage & { todos: Todo[] }> = isActive
    ? pagesData
    : [];
  const todos: Todo[] = isActive ? projectTodosData : [];
  const pages =
    isEditing && editedPages.length > 0 ? editedPages : originalPages;

  if (!project || !originalProject) {
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

  const handleEdit = () => {
    setEditedProject({ ...originalProject });
    setEditedPages([...originalPages]);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: API Save Logic
  };

  // 데이터 업데이트 핸들러들
  const updatePage = (id: number, updates: any) =>
    setEditedPages((prev) =>
      prev.map((p) => (p.project_page_id === id ? { ...p, ...updates } : p))
    );
  const updatePageTodo = (pId: number, tId: number, updates: any) =>
    setEditedPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId
          ? {
              ...p,
              todos: p.todos.map((t) =>
                t.id === tId ? { ...t, ...updates } : t
              ),
            }
          : p
      )
    );
  const deletePageTodo = (pId: number, tId: number) =>
    setEditedPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId
          ? { ...p, todos: p.todos.filter((t) => t.id !== tId) }
          : p
      )
    );
  const addPageTodo = (pId: number, newTodo: Todo) =>
    setEditedPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pId ? { ...p, todos: [...p.todos, newTodo] } : p
      )
    );
  const updateProjectField = (field: keyof Project, value: string) =>
    editedProject && setEditedProject({ ...editedProject, [field]: value });

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
            {isActive && isEditing ? (
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
              pages.length > 0 &&
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
            todos={todos}
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
