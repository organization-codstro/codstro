import React, { useState } from "react";
import {
  Archive,
  Star,
  Clock,
  ExternalLink,
  Github,
  Search,
  Filter,
  Calendar,
  Tag,
  BookmarkCheck,
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  PlayCircle,
  Circle,
} from "lucide-react";
import {
  Project,
  UserProject,
  archivedProjectsData,
  archivedUserProjectsData,
  difficultyColors,
  statusColors,
} from "../../data/woomoonro/woomoonroData";
import ProjectDetailView from "./ProjectDetailView";

const WoomoonroArchive: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "completed" | "in_progress" | "not_started"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "title" | "difficulty">("date");

  const getUserProject = (projectId: string): UserProject | undefined => {
    return archivedUserProjectsData.find((up) => up.project_id === projectId);
  };

  const toggleBookmark = (projectId: string) => {
    console.log("Toggle bookmark for project:", projectId);
  };

  const updateProjectStatus = (
    projectId: string,
    status: UserProject["status"]
  ) => {
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
      <div className="p-8 bg-gray-50">
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

  const filteredProjects = archivedProjectsData
    .filter((project) => {
      const userProject = getUserProject(project.id);

      // Filter by status
      if (
        selectedFilter !== "all" &&
        (!userProject || userProject.status !== selectedFilter)
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
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "difficulty":
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "date":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

  const getStatusIcon = (status: UserProject["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in_progress":
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
              <Archive className="h-7 w-7 text-[#587CF0]" />
              Bookmarked Projects Archive
            </h1>
            <p className="text-gray-600">
              Manage your saved clone coding projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search archived projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent bg-white transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Archive className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Bookmarked</p>
                <p className="text-xl font-semibold text-gray-800">
                  {archivedProjectsData.length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    archivedUserProjectsData.filter(
                      (up) => up.status === "completed"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <PlayCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    archivedUserProjectsData.filter(
                      (up) => up.status === "in_progress"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <Circle className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Not Started</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    archivedUserProjectsData.filter(
                      (up) => up.status === "not_started"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
              {(
                ["all", "completed", "in_progress", "not_started"] as const
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
              {(["all", "beginner", "intermediate", "advanced"] as const).map(
                (difficulty) => (
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
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "title" | "difficulty")
                }
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
              >
                <option value="date">Date Added</option>
                <option value="title">Title</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const userProject = getUserProject(project.id);

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
                    <div className="flex items-center gap-1">
                      <BookmarkCheck className="w-5 h-5 text-yellow-500" />
                      {userProject && getStatusIcon(userProject.status)}
                    </div>
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
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs text-blue-700 border border-blue-200 rounded bg-blue-50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Notes */}
                  {userProject?.progress_notes && (
                    <div className="p-3 mb-4 rounded-lg bg-blue-50">
                      <p className="text-sm text-blue-800 line-clamp-2">
                        {userProject.progress_notes}
                      </p>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Added:{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {userProject?.completed_at && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        <span>
                          Completed:{" "}
                          {new Date(
                            userProject.completed_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
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

                    {userProject && (
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
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
            <Archive className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-800">
              No archived projects found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WoomoonroArchive;
