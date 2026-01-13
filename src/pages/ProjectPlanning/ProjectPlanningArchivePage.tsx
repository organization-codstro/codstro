import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { archivedProjectsData } from "../../data/ProjectPlanning/project";
import { EmptyProjectState } from "../../components/ProjectPlanning/EmptyProjectState";
import { ProjectCard } from "../../components/ProjectPlanning/ProjectCard";
import { ArchiveHeader } from "../../components/ProjectPlanning/ProjectPlanningArchivePage/ArchiveHeader";

export default function ProjectPlanningArchivePage() {
  const navigate = useNavigate();

  // TODO: API 연동 - 실제 아카이브된 프로젝트 데이터 가져오기
  const archivedProjects = archivedProjectsData;

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <ArchiveHeader />

      <div className="p-8 mx-auto max-w-7xl">
        {archivedProjects.length === 0 ? (
          <EmptyProjectState
            Icon={Calendar}
            title="No archived projects"
            description="마감일이 끝난 프로젝트가 없습니다."
            colorClass="text-gray-400"
            bgColorClass="bg-gray-100"
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {archivedProjects.map((project) => (
              <ProjectCard
                key={project.project_id}
                project={project}
                onClick={() => handleProjectClick(project.project_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
