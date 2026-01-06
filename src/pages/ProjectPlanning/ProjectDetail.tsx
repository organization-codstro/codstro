import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, Edit, Play, Clock, Save, X } from "lucide-react";
import {
  ProjectPage,
  Todo,
  Project,
} from "../../types/ProjectPlanning/project";
import {
  activeProjectsData,
  planningProjectsData,
  pagesData,
  projectTodosData,
} from "../../data/ProjectPlanning/project";
import { ProjectBasicInfoSection } from "../../components/ProjectPlanning/ProjectBasicInfoSection";
import { ProjectPagesSection } from "../../components/ProjectPlanning/ProjectPagesSection";

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // TODO: API 연동 - 실제 프로젝트 데이터 가져오기
  const allProjects = [...activeProjectsData, ...planningProjectsData];
  const originalProject = allProjects.find(
    (p) => p.project_id === Number(projectId)
  );

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(
    originalProject || null
  );
  const [editedPages, setEditedPages] = useState<
    Array<ProjectPage & { todos: Todo[] }>
  >([]);
  const [expandedPage, setExpandedPage] = useState<number | null>(null);

  const project = isEditing ? editedProject : originalProject;

  // TODO: API 연동 - 실제 페이지 및 할일 데이터 가져오기
  const originalPages: Array<ProjectPage & { todos: Todo[] }> =
    project?.project_status === "active" ? pagesData : [];
  const todos: Todo[] =
    project?.project_status === "active" ? projectTodosData : [];

  // 편집 모드일 때 editedPages 사용, 아닐 때 originalPages 사용
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
            className="px-6 py-2 mt-4 font-medium text-white rounded-lg"
            style={{ backgroundColor: "#587CF0" }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const isPlanning = project.project_status === "planning";
  const isActive = project.project_status === "active";

  // 편집 모드 핸들러
  const handleEdit = () => {
    if (originalProject) {
      setEditedProject({ ...originalProject });
      setEditedPages([...originalPages]);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditedProject(originalProject);
    setEditedPages([...originalPages]);
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: API 연동 - 프로젝트 정보 및 페이지 정보 저장
    if (editedProject) {
      console.log("Saving project:", editedProject);
      console.log("Saving pages:", editedPages);
      // API 호출 후 성공 시
      setIsEditing(false);
      // 원본 데이터 업데이트 (실제로는 API 응답으로 업데이트)
    }
  };

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

  const updatePage = (
    pageId: number,
    updates: Partial<ProjectPage & { todos: Todo[] }>
  ) => {
    setEditedPages((prev) =>
      prev.map((page) =>
        page.project_page_id === pageId ? { ...page, ...updates } : page
      )
    );
  };

  const updatePageTodo = (
    pageId: number,
    todoId: number,
    updates: Partial<Todo>
  ) => {
    setEditedPages((prev) =>
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

  const deletePageTodo = (pageId: number, todoId: number) => {
    setEditedPages((prev) =>
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

  const addPageTodo = (pageId: number, newTodo: Todo) => {
    setEditedPages((prev) =>
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

  // 프로젝트 정보 업데이트 핸들러
  const updateProjectField = (field: keyof Project, value: string) => {
    if (editedProject) {
      setEditedProject({ ...editedProject, [field]: value });
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/projects")}
                className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {project.project_name}
                  </h1>
                  {isPlanning ? (
                    <span className="flex items-center px-3 py-1 space-x-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span>Planning</span>
                    </span>
                  ) : (
                    <span className="flex items-center px-3 py-1 space-x-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                      <Play className="w-4 h-4" />
                      <span>Active</span>
                    </span>
                  )}
                </div>
                <p className="mt-1 text-gray-600">{project.project_topic}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isPlanning && (
                <button
                  onClick={() =>
                    navigate("/projects/new", {
                      state: { projectId: project.project_id },
                    })
                  }
                  className="flex items-center px-4 py-2 space-x-2 font-medium text-white rounded-lg"
                  style={{ backgroundColor: "#587CF0" }}
                >
                  <Edit className="w-4 h-4" />
                  <span>Continue Planning</span>
                </button>
              )}
              {isActive && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Project</span>
                </button>
              )}
              {isActive && isEditing && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 space-x-2 font-medium text-white rounded-lg"
                    style={{ backgroundColor: "#587CF0" }}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Project Info */}
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
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Project Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="mt-1 text-gray-900">
                      {project.project_description || "No description provided"}
                    </p>
                  </div>
                  {project.project_stacks && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Tech Stack
                      </label>
                      <p className="mt-1 text-gray-900">
                        {project.project_stacks}
                      </p>
                    </div>
                  )}
                  {project.project_start_date && project.project_end_date && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Timeline
                      </label>
                      <div className="flex items-center mt-1 space-x-2 text-gray-900">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {project.project_start_date} -{" "}
                          {project.project_end_date}
                        </span>
                      </div>
                    </div>
                  )}
                  {project.project_style && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Design Style
                      </label>
                      <p className="mt-1 text-gray-900">
                        {project.project_style}
                      </p>
                    </div>
                  )}
                  {project.project_effect && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Effects
                      </label>
                      <p className="mt-1 text-gray-900">
                        {project.project_effect}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Main Color
                    </label>
                    <div className="flex items-center mt-2 space-x-2">
                      <div
                        className="w-8 h-8 border border-gray-300 rounded-full"
                        style={{ backgroundColor: project.project_main_color }}
                      />
                      <span className="text-gray-900">
                        {project.project_main_color}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pages (only for active projects) */}
            {!isPlanning && pages.length > 0 && (
              <div>
                {isEditing ? (
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
                ) : (
                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                      Pages ({pages.length})
                    </h2>
                    <div className="space-y-4">
                      {pages.map((page) => (
                        <div
                          key={page.project_page_id}
                          className="p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">
                                {page.project_page_name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                {page.project_page_role}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {page.project_page_function}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                page.project_page_is_complete
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {page.project_page_is_complete
                                ? "Complete"
                                : "In Progress"}
                            </span>
                          </div>
                          {page.todos && page.todos.length > 0 && (
                            <div className="pl-3 mt-3 ml-4 border-l-2 border-gray-200">
                              <p className="mb-2 text-xs font-medium text-gray-500">
                                Tasks ({page.todos.length})
                              </p>
                              {page.todos.map((todo) => (
                                <div
                                  key={todo.id}
                                  className="mb-2 text-sm text-gray-700"
                                >
                                  • {todo.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Planning Status Message */}
            {isPlanning && (
              <div className="p-6 border border-orange-200 rounded-lg bg-orange-50">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-orange-900">
                      Project Planning in Progress
                    </h3>
                    <p className="mt-1 text-sm text-orange-700">
                      This project is currently in the planning phase. Continue
                      planning to complete the setup and start development.
                    </p>
                    <button
                      onClick={() =>
                        navigate("/projects/new", {
                          state: { projectId: project.project_id },
                        })
                      }
                      className="px-4 py-2 mt-3 text-sm font-medium text-white rounded-lg"
                      style={{ backgroundColor: "#587CF0" }}
                    >
                      Continue Planning
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats (only for active projects) */}
            {!isPlanning && (
              <>
                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                  <h3 className="mb-4 text-sm font-semibold text-gray-900">
                    Project Tasks
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total</span>
                      <span className="font-medium text-gray-900">
                        {todos.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-medium text-green-600">
                        {todos.filter((t) => t.status === "completed").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">In Progress</span>
                      <span className="font-medium text-yellow-600">
                        {todos.filter((t) => t.status === "in-progress").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Waiting</span>
                      <span className="font-medium text-gray-600">
                        {todos.filter((t) => t.status === "pending").length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                  <h3 className="mb-4 text-sm font-semibold text-gray-900">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        navigate(`/projects/meetings/new`, {
                          state: { projectId: project.project_id },
                        })
                      }
                      className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Create Meeting
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/projects/meetings`, {
                          state: { projectId: project.project_id },
                        })
                      }
                      className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      View Meetings
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Project Metadata */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Project Details
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Created:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(
                      project.project_created_date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 text-gray-900">
                    {isPlanning ? "Planning" : "Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
