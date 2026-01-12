import { Archive } from "lucide-react";
import ProjectCard from "./CloneCodingProjectCard";
import { CloneCodingProjectGridProps } from "../../../types/pages/Woomoonro/CloneCodingProjectGrid/CloneCodingProjectGrid";

// --- ProjectGrid 컴포넌트 ---
const ProjectGrid = ({
  projects,
  getUserProject,
  onCardClick,
  onToggleBookmark,
}: CloneCodingProjectGridProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white border border-gray-300 border-dashed rounded-xl">
        <Archive className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-gray-500">
          검색 결과와 일치하는 프로젝트가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          userProject={getUserProject(project.id)}
          onClick={onCardClick}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
