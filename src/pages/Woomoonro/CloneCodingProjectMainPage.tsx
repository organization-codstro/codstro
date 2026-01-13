import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  projectsData,
  userProjectsData as initialData,
} from "../../data/woomoonro/woomoonroData";
import ProjectGrid from "../../components/Woomoonro/CloneCodingProjectGrid/CloneCodingProjectGrid";
import PageHeader from "../../components/Woomoonkyung/StudyPlanEditPage/PageHeader";
import ProjectFilters from "../../components/Woomoonro/CloneCodingProjectMainPage/ProjectFilters";
import NoResults from "../../components/Woomoonro/CloneCodingProjectMainPage/NoResults";

export default function CloneCodingProjectMainPage() {
  const navigate = useNavigate();

  // 1. 필터 및 데이터 상태
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "bookmarked" | "in_progress" | "completed"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userProjectsData, setUserProjectsData] = useState(initialData);

  // 2. 헬퍼 함수
  const getUserProject = (projectId: number) =>
    userProjectsData.find((up) => up.project_id === projectId);

  const handleToggleBookmark = (projectId: number) => {
    setUserProjectsData((prev) =>
      prev.map((up) =>
        up.project_id === projectId
          ? { ...up, is_bookmarked: !up.is_bookmarked }
          : up
      )
    );
  };

  // 3. 필터링 로직
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
      !project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <PageHeader
          title="Woomoonro"
          description="Discover and manage clone coding projects to level up your skills."
        />

        <div className="space-y-6">
          {/* Filters Section */}
          <ProjectFilters
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />

          {/* Projects Content */}
          {filteredProjects.length > 0 ? (
            <ProjectGrid
              projects={filteredProjects}
              getUserProject={getUserProject}
              onCardClick={(id) => navigate(`/woomoonro/project/${id}`)}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </div>
  );
}
