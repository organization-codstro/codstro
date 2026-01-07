import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  Clock,
  Search,
  Calendar,
  BookmarkCheck,
  CheckCircle2,
  PlayCircle,
  Circle,
  ExternalLink,
  Github,
} from "lucide-react";
import {
  archivedProjectsData,
  archivedUserProjectsData as initialArchivedUserProjectsData,
} from "../../data/woomoonro/woomoonroData";
import { UserProject } from "../../types/Woomoonro/woomoonro";
import ProjectGrid from "../../components/woomoonro/ProjectGrid/ProjectGrid";

// 타입 정의
type DifficultyType = "all" | "beginner" | "intermediate" | "advanced";
type StatusFilterType = "all" | "completed" | "in_progress" | "not_started";

const WoomoonroArchiveList: React.FC = () => {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState<StatusFilterType>("all");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title" | "difficulty">("date");

  // 북마크 상태 관리를 위한 state 추가
  const [archivedUserProjectsData, setArchivedUserProjectsData] = useState(
    initialArchivedUserProjectsData
  );

  const getUserProject = (projectId: number): UserProject | undefined => {
    return archivedUserProjectsData.find((up) => up.project_id === projectId);
  };

  // 북마크 토글 함수
  const handleToggleBookmark = (projectId: number) => {
    setArchivedUserProjectsData((prevData) =>
      prevData.map((userProject) =>
        userProject.project_id === projectId
          ? { ...userProject, is_bookmarked: !userProject.is_bookmarked }
          : userProject
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
          const order: Record<string, number> = {
            beginner: 1,
            intermediate: 2,
            advanced: 3,
          };
          return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
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
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] bg-white transition-all"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard
            icon={<Archive className="w-5 h-5 text-blue-600" />}
            label="Total"
            value={archivedProjectsData.length}
            bgColor="bg-blue-100"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
            label="Completed"
            value={
              archivedUserProjectsData.filter((up) => up.status === "completed")
                .length
            }
            bgColor="bg-green-100"
          />
          <StatCard
            icon={<PlayCircle className="w-5 h-5 text-yellow-600" />}
            label="In Progress"
            value={
              archivedUserProjectsData.filter(
                (up) => up.status === "in_progress"
              ).length
            }
            bgColor="bg-yellow-100"
          />
          <StatCard
            icon={<Circle className="w-5 h-5 text-gray-600" />}
            label="Not Started"
            value={
              archivedUserProjectsData.filter(
                (up) => up.status === "not_started"
              ).length
            }
            bgColor="bg-gray-100"
          />
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <div className="flex flex-wrap items-center gap-6">
            <FilterGroup
              label="Status"
              current={selectedFilter}
              options={["all", "completed", "in_progress", "not_started"]}
              onChange={(v) => setSelectedFilter(v as StatusFilterType)}
            />
            <FilterGroup
              label="Difficulty"
              current={selectedDifficulty}
              options={["all", "beginner", "intermediate", "advanced"]}
              onChange={(v) => setSelectedDifficulty(v as DifficultyType)}
            />
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium text-gray-700">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </div>

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

// 컴포넌트들 타입 정의 추가
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
}
const StatCard = ({ icon, label, value, bgColor }: StatCardProps) => (
  <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center w-10 h-10 ${bgColor} rounded-lg`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

interface FilterGroupProps {
  label: string;
  current: string;
  options: string[];
  onChange: (val: string) => void;
}
const FilterGroup = ({
  label,
  current,
  options,
  onChange,
}: FilterGroupProps) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-700">{label}:</span>
    <div className="flex gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
            current === opt
              ? "bg-[#587CF0] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {opt.replace("_", " ")}
        </button>
      ))}
    </div>
  </div>
);

export default WoomoonroArchiveList;
