import React, { useState } from "react";
import {
  Code,
  Clock,
  ExternalLink,
  Filter,
  Search,
  CheckCircle2,
  Circle,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Github,
} from "lucide-react";
import {
  projectsData,
  userProjectsData,
  difficultyColors,
  statusColors,
} from "../../data/woomoonro/woomoonroData";
import { useNavigate } from "react-router-dom";
import { UserProject } from "../../types/woomoonro/woomoonro";
import ProjectGrid from "../../components/woomoonro/ProjectGrid";

const WoomoonroList = () => {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "bookmarked" | "in_progress" | "completed"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getUserProject = (projectId: number): UserProject | undefined => {
    return userProjectsData.find((up) => up.project_id === projectId);
  };

  const toggleBookmark = (projectId: number) => {
    console.log("Toggle bookmark for project:", projectId);
  };

  const updateProjectStatus = (
    projectId: number,
    status: UserProject["status"]
  ) => {
    console.log("Update project status:", projectId, status);
  };

  const filteredProjects = projectsData.filter((project) => {
    const userProject = getUserProject(project.id);

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
    if (
      selectedDifficulty !== "all" &&
      project.difficulty !== selectedDifficulty
    )
      return false;
    if (
      searchQuery &&
      !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Woomoonro</h1>
            <p className="text-gray-600">
              Discover and manage clone coding projects
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="w-full space-y-6">
            {/* Filters */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl w-fit">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Status:
                  </span>
                  {(
                    ["all", "bookmarked", "in_progress", "completed"] as const
                  ).map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFilter(f)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedFilter === f
                          ? "bg-[#587CF0] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {f.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Difficulty:
                  </span>
                  {(
                    ["all", "beginner", "intermediate", "advanced"] as const
                  ).map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDifficulty(d)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedDifficulty === d
                          ? "bg-[#587CF0] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <ProjectGrid
              projects={filteredProjects}
              getUserProject={getUserProject}
              onCardClick={(id) => navigate(`/woomoonro/project/${id}`)}
            />

            {filteredProjects.length === 0 && (
              <div className="p-12 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
                <Code className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-800">
                  No projects found
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WoomoonroList;
