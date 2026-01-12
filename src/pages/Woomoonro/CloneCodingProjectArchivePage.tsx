import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  Search,
  CheckCircle2,
  PlayCircle,
  Circle,
} from "lucide-react";
import {
  archivedProjectsData,
  archivedUserProjectsData as initialData,
} from "../../data/woomoonro/woomoonroData";
import ProjectGrid from "../../components/Woomoonro/CloneCodingProjectGrid/CloneCodingProjectGrid";
import { StatCard } from "../../components/Woomoonro/CloneCodingProjectArchivePage/CloneCodingProjectStatCard";
import ArchiveFilters from "../../components/Woomoonro/CloneCodingProjectArchivePage/CloneCodingProjectArchiveFilters";

const WoomoonroArchiveList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [archivedUserProjectsData, setArchivedUserProjectsData] =
    useState(initialData);

  const getUserProject = (projectId: number) =>
    archivedUserProjectsData.find((up) => up.project_id === projectId);

  const handleToggleBookmark = (projectId: number) => {
    setArchivedUserProjectsData((prev) =>
      prev.map((up) =>
        up.project_id === projectId
          ? { ...up, is_bookmarked: !up.is_bookmarked }
          : up
      )
    );
  };

  const filteredProjects = archivedProjectsData
    .filter((project) => {
      const userProject = getUserProject(project.id);
      if (
        selectedFilter !== "all" &&
        (!userProject || userProject.status !== selectedFilter)
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
    })
    .sort((a, b) => {
      // ... (기존 정렬 로직 동일)
      return sortBy === "title" ? a.title.localeCompare(b.title) : 0;
    });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
              <Archive className="h-8 w-8 text-[#587CF0]" /> Bookmarked Archive
            </h1>
            <p className="mt-1 text-gray-600">
              Manage and track your saved clone coding projects
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#587CF0] outline-none bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            icon={<Archive className="w-5 h-5 text-blue-600" />}
            label="Total"
            value={archivedProjectsData.length}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
            label="Completed"
            value={
              archivedUserProjectsData.filter((up) => up.status === "completed")
                .length
            }
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<PlayCircle className="w-5 h-5 text-yellow-600" />}
            label="In Progress"
            value={
              archivedUserProjectsData.filter(
                (up) => up.status === "in_progress"
              ).length
            }
            bgColor="bg-yellow-50"
          />
          <StatCard
            icon={<Circle className="w-5 h-5 text-gray-600" />}
            label="Not Started"
            value={
              archivedUserProjectsData.filter(
                (up) => up.status === "not_started"
              ).length
            }
            bgColor="bg-gray-50"
          />
        </div>

        {/* Filter Section */}
        <ArchiveFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Projects Grid */}
        <ProjectGrid
          projects={filteredProjects}
          getUserProject={getUserProject}
          onCardClick={(id) => navigate(`/woomoonro/project/${id}`)}
          onToggleBookmark={handleToggleBookmark}
        />
      </div>
    </div>
  );
};

export default WoomoonroArchiveList;
