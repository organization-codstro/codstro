import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Clock,
  ExternalLink,
  Github,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  CreditCard as Edit3,
  Link,
  FileText,
  Users,
  Target,
} from "lucide-react";
import {
  projectsData,
  userProjectsData,
  projectTodosData,
  difficultyColors,
  statusColors,
  projectGroups,
} from "../../data/woomoonro/woomoonroData";
import { Project, UserProject } from "../../types/woomoonro/woomoonro";

const ProjectDetailPage: React.FC = () => {
  // 1. 라우터 관련 훅
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // 2. 상태 관리
  const [project, setProject] = useState<Project | null>(null);
  const [userProject, setUserProject] = useState<UserProject | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "todos" | "groups" | "notes"
  >("overview");
  const [newTodo, setNewTodo] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [notes, setNotes] = useState("");

  // 3. 데이터 로드 로직
  useEffect(() => {
    if (projectId) {
      const numericId = Number(projectId);
      console.log(numericId);
      const foundProject = projectsData.find((p) => p.id === numericId);

      if (foundProject) {
        setProject(foundProject);
        const foundUserProject = userProjectsData.find(
          (up) => up.project_id === numericId
        );
        setUserProject(foundUserProject);
        setNotes(foundUserProject?.progress_notes || "");
      } else {
        // 프로젝트가 없거나 숫자가 아닌 경우 목록으로 이동
        navigate("/woomoonro");
      }
    }
  }, [projectId, navigate]);

  console.log(project);

  if (!project) return null;

  // 4. 기능 핸들러 (기존 로직 유지)
  const onBack = () => navigate("/woomoonro");
  const onToggleBookmark = (id: number) =>
    //todo : 북마크 함수 호출
    console.log("Toggle bookmark for project:", id);
  const onUpdateStatus = (id: number, status: UserProject["status"]) =>
    //todo : 북마크 상태 변경 api 호출
    console.log("Update project status:", id, status);

  // Mock data/기능들
  const currentProjectTodos = projectTodosData.filter(
    (todo) => todo.project_id === project.id
  );

  const completedTodos = currentProjectTodos.filter(
    (todo) => todo.is_completed
  ).length;
  const totalTodos = currentProjectTodos.length;
  const progressPercentage =
    totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
        <button
          onClick={() => onToggleBookmark(project.id)}
          className="p-2 text-gray-400 transition-colors hover:text-yellow-500"
        >
          {userProject?.is_bookmarked ? (
            <BookmarkCheck className="w-6 h-6 text-yellow-500" />
          ) : (
            <Bookmark className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Project Info Card */}
      <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
        {project.thumbnail_url && (
          <div className="h-64 overflow-hidden bg-gray-200">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Project Details */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full border ${
                    difficultyColors[project.difficulty]
                  }`}
                >
                  {project.difficulty}
                </span>
                {userProject && (
                  <span
                    className={`px-3 py-1 text-sm rounded-full border ${
                      statusColors[userProject.status]
                    }`}
                  >
                    {userProject.status.replace("_", " ")}
                  </span>
                )}
                <span className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <Clock className="w-4 h-4" />
                  {project.estimated_hours} hours
                </span>
              </div>

              <div>
                <h3 className="mb-2 font-medium text-gray-800">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm text-blue-700 border border-blue-200 rounded-lg bg-blue-50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium text-gray-800">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Status & Progress */}
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-gray-800">
                  Project Status
                </h3>
                <select
                  value={userProject?.status || "not_started"}
                  onChange={(e) =>
                    onUpdateStatus(
                      project.id,
                      e.target.value as UserProject["status"]
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0]"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {totalTodos > 0 && (
                <div>
                  <h3 className="mb-2 font-medium text-gray-800">Progress</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tasks completed</span>
                      <span className="font-medium">
                        {completedTodos}/{totalTodos}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="bg-[#587CF0] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {Math.round(progressPercentage)}% complete
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
