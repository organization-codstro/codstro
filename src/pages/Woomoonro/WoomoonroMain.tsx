import React, { useState } from "react";
import {
  Code,
  Star,
  BookOpen,
  Clock,
  ExternalLink,
  Github,
  Play,
  Filter,
  Search,
  CheckCircle2,
  Circle,
  PlayCircle,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Tag,
} from "lucide-react";
import {
  projectsData,
  userProjectsData,
  projectTodosData,
  difficultyColors,
  statusColors,
  Project,
  UserProject,
} from "../../data/woomoonro/woomoonroData";
import ProjectDetailView from "./ProjectDetailView";

const WoomoonroMain: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "bookmarked" | "in_progress" | "completed"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getUserProject = (projectId: string): UserProject | undefined => {
    return userProjectsData.find((up) => up.project_id === projectId);
  };

  const toggleBookmark = (projectId: string) => {
    // In real app, this would make an API call
    console.log("Toggle bookmark for project:", projectId);
  };

  const updateProjectStatus = (
    projectId: string,
    status: UserProject["status"]
  ) => {
    // In real app, this would make an API call
    console.log("Update project status:", projectId, status);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  // If a project is selected, show the detail view
  if (selectedProject) {
    const userProject = getUserProject(selectedProject.id);
    return (
      <div className="flex-1 min-h-screen p-8 bg-gray-50">
        <ProjectDetailView
          project={selectedProject}
          userProject={userProject}
          onBack={handleBackToList}
          onUpdateStatus={updateProjectStatus}
          onToggleBookmark={toggleBookmark}
        />
      </div>
    );
  }

  const filteredProjects = projectsData.filter((project) => {
    const userProject = getUserProject(project.id);

    // Filter by status/bookmark
    if (
      selectedFilter === "bookmarked" &&
      (!userProject || !userProject.is_bookmarked)
    )
      return false;
    if (
      selectedFilter === "in_progress" &&
      (!userProject || userProject.status !== "in_progress")
    )
      return false;
    if (
      selectedFilter === "completed" &&
      (!userProject || userProject.status !== "completed")
    )
      return false;

    // Filter by difficulty
    if (
      selectedDifficulty !== "all" &&
      project.difficulty !== selectedDifficulty
    )
      return false;

    // Filter by search query
    if (
      searchQuery &&
      !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  const getProjectTodos = (projectId?: string) => {
    return projectTodosData.filter((todo) => todo.project_id === projectId);
  };

  const getTodayTodos = () => {
    const today = new Date().toISOString().split("T")[0];
    return projectTodosData.filter(
      (todo) =>
        todo.due_date && todo.due_date.startsWith(today) && !todo.is_completed
    );
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Woomoonro</h1>
            <p className="text-gray-600">
              Discover and manage clone coding projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Filters */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Status:
                  </span>
                  {(
                    ["all", "bookmarked", "in_progress", "completed"] as const
                  ).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedFilter === filter
                          ? "bg-[#587CF0] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {filter.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Difficulty:
                  </span>
                  {(
                    ["all", "beginner", "intermediate", "advanced"] as const
                  ).map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedDifficulty === difficulty
                          ? "bg-[#587CF0] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredProjects.map((project) => {
                const userProject = getUserProject(project.id);
                const projectTodos = getProjectTodos(project.id);

                return (
                  <div
                    key={project.id}
                    className="overflow-hidden transition-shadow bg-white border border-purple-100 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Project Image */}
                    {project.thumbnail_url && (
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={project.thumbnail_url}
                          alt={project.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="mb-2 text-lg font-semibold text-gray-800">
                            {project.title}
                          </h3>
                          <p className="mb-3 text-sm text-gray-600">
                            {project.description}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(project.id);
                          }}
                          className="p-2 text-gray-400 transition-colors hover:text-yellow-500"
                        >
                          {userProject?.is_bookmarked ? (
                            <BookmarkCheck className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <Bookmark className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${
                            difficultyColors[project.difficulty]
                          }`}
                        >
                          {project.difficulty}
                        </span>
                        {userProject && (
                          <span
                            className={`px-2 py-1 text-xs rounded-full border ${
                              statusColors[userProject.status]
                            }`}
                          >
                            {userProject.status.replace("_", " ")}
                          </span>
                        )}
                        <span className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                          <Clock className="w-3 h-3" />
                          {project.estimated_hours}h
                        </span>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tech_stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs text-blue-700 border border-blue-200 rounded bg-blue-50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Progress Notes */}
                      {userProject?.progress_notes && (
                        <div className="p-3 mb-4 rounded-lg bg-blue-50">
                          <p className="text-sm text-blue-800">
                            {userProject.progress_notes}
                          </p>
                        </div>
                      )}

                      {/* Project Todos */}
                      {projectTodos.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-2 text-sm font-medium text-gray-700">
                            Project Tasks:
                          </h4>
                          <div className="space-y-1">
                            {projectTodos.slice(0, 3).map((todo) => (
                              <div
                                key={todo.id}
                                className="flex items-center gap-2 text-sm"
                              >
                                {todo.is_completed ? (
                                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Circle className="w-3 h-3 text-gray-400" />
                                )}
                                <span
                                  className={
                                    todo.is_completed
                                      ? "text-gray-500 line-through"
                                      : "text-gray-700"
                                  }
                                >
                                  {todo.title}
                                </span>
                              </div>
                            ))}
                            {projectTodos.length > 3 && (
                              <p className="text-xs text-gray-500">
                                +{projectTodos.length - 3} more tasks
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 text-gray-400 transition-colors hover:text-gray-600"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 text-gray-400 transition-colors hover:text-gray-600"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {userProject ? (
                            <select
                              value={userProject.status}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateProjectStatus(
                                  project.id,
                                  e.target.value as UserProject["status"]
                                );
                              }}
                              className="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
                            >
                              <option value="not_started">Not Started</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateProjectStatus(project.id, "not_started");
                              }}
                              className="px-4 py-2 bg-[#587CF0] text-white text-sm rounded-lg hover:bg-[#4a6de8] transition-colors"
                            >
                              Start Project
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="p-12 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
                <Code className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  No projects found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Tasks */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800">
                <Calendar className="h-4 w-4 text-[#587CF0]" />
                Today's Tasks
              </h3>
              <div className="space-y-3">
                {getTodayTodos().map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <Circle className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">
                        {todo.title}
                      </h4>
                      {todo.description && (
                        <p className="mt-1 text-xs text-gray-600">
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {getTodayTodos().length === 0 && (
                  <p className="py-4 text-sm text-center text-gray-500">
                    No tasks due today
                  </p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-800">
                Progress Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Projects</span>
                  <span className="font-medium text-gray-800">
                    {projectsData.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bookmarked</span>
                  <span className="font-medium text-gray-800">
                    {userProjectsData.filter((up) => up.is_bookmarked).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="font-medium text-gray-800">
                    {
                      userProjectsData.filter(
                        (up) => up.status === "in_progress"
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-medium text-gray-800">
                    {
                      userProjectsData.filter((up) => up.status === "completed")
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Popular Tech Stack */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-800">
                Popular Tech Stack
              </h3>
              <div className="space-y-2">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Tailwind CSS",
                  "Express",
                ].map((tech) => (
                  <div key={tech} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{tech}</span>
                    <span className="text-xs text-gray-500">
                      {
                        projectsData.filter((p) => p.tech_stack.includes(tech))
                          .length
                      }{" "}
                      projects
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WoomoonroMain;
