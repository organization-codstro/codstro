import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// 컴포넌트 임포트
import { EmptyProjectState } from "../../components/ProjectPlanning/EmptyProjectState";
import { ProjectCard } from "../../components/ProjectPlanning/ProjectCard";
import { ArchiveHeader } from "../../components/ProjectPlanning/ProjectPlanningArchivePage/ArchiveHeader";

// API 서비스 및 타입 임포트
import { Project } from "../../types/common/ProjectPlanning";
import { LoginService } from "../../api/Auth/LoginPage";
import { ProjectArchiveService } from "../../api/ProjectPlanning/ProjectPlanningArchivePage";

export default function ProjectPlanningArchivePage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [archivedProjects, setArchivedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. 데이터 페칭 로직
  useEffect(() => {
    const fetchArchivedProjects = async () => {
      const userId = await LoginService.getCurrentUserId();

      if (!userId) {
        toast.error("로그인이 필요한 서비스입니다.");
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        // 서비스 호출: 마감일 < 오늘 인 프로젝트 조회
        const data = await ProjectArchiveService.getArchivedProjects({
          userId,
        });
        setArchivedProjects(data as any);
      } catch (error) {
        console.error(error);
        toast.error("아카이브 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchivedProjects();
  }, [navigate]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <ArchiveHeader />

      <div className="p-8 mx-auto max-w-7xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="w-10 h-10 mb-4 text-blue-500 animate-spin" />
            <p className="text-gray-500">
              아카이브된 프로젝트를 불러오고 있습니다...
            </p>
          </div>
        ) : archivedProjects.length === 0 ? (
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
