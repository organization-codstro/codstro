import { useState, useEffect } from "react";
import { Play, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Project } from "../../types/common/projectPlanning";

// 컴포넌트 임포트
import { ProjectListHeader } from "../../components/ProjectPlanning/ProjectMainPage/ProjectListHeader";
import { EmptyProjectState } from "../../components/ProjectPlanning/EmptyProjectState";
import { ProjectCard } from "../../components/ProjectPlanning/ProjectCard";
import { LoginService } from "../../api/Auth/LoginPage";
import { ProjectMainService } from "../../api/ProjectPlanning/ProjectMainPage";

export default function ProjectMainPage() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [planningProjects, setPlanningProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. 데이터 로드 (useEffect)
  useEffect(() => {
    const fetchAllData = async () => {
      const userId = await LoginService.getCurrentUserId();
      if (!userId) {
        toast.error("로그인이 필요한 페이지입니다.");
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        // 모든 데이터를 병렬로 로드

        const [active, planning] = await Promise.all([
          ProjectMainService.getActiveProjects({ userId }),
          ProjectMainService.getPlanningProjects({ userId }),
        ]);

        setActiveProjects(active as any);
        setPlanningProjects(planning as any);
      } catch (error) {
        toast.error("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  // 3. 기획 단계 이어서 하기 로직
  const handleContinuePlanning = async (projectId: string) => {
    try {
      toast.info("마지막 진행 단계를 확인 중입니다...");
      const { step, data } = await ProjectMainService.determinePlanningStep({
        projectId,
      });

      // 각 단계에 맞는 경로로 이동하며 상태(state) 전달
      switch (step) {
        case 1: // 기초 정보 입력 단계
          navigate(`/projects/new/${projectId}`);
          break;
        case 2: // AI 채팅 단계
          navigate("/projects/new/chat", {
            state: {
              projectId,
              basicInfo: {
                project_topic: data.project_topic,
                desired_features: data.project_description,
              },
            },
          });
          break;
        case 3: // 최종 확인 및 생성 단계
          navigate("/projects/new/info", {
            state: { projectId, basicInfo: data },
          });
          break;
        default:
          navigate("/projects/new");
      }
    } catch (error) {
      toast.error("단계를 판별할 수 없습니다.");
    }
  };

  const handleCreateNew = () => navigate("/projects/new");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full space-y-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-gray-500">프로젝트 목록을 불러오고 있습니다...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8 mx-auto max-w-7xl">
        <ProjectListHeader onNewProject={handleCreateNew} />

        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Active Projects Section */}
          <div className="mt-8 ">
            <div className="flex items-center mb-4 space-x-2">
              <Play className="w-5 h-5 text-[#587CF0]" />
              <h2 className="text-xl font-semibold text-gray-900">
                Active Projects
              </h2>
            </div>

            {activeProjects.length === 0 ? (
              <EmptyProjectState
                Icon={Play}
                title="No active projects yet"
                description="Complete project planning to start active projects"
                colorClass="text-blue-400"
                bgColorClass="bg-blue-50"
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {activeProjects.map((project) => (
                  <ProjectCard
                    key={project.project_id}
                    project={project}
                    onClick={() => navigate(`/projects/${project.project_id}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Planning Projects Section */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-xl font-semibold text-gray-900">
                Planning Projects
              </h2>
            </div>

            {planningProjects.length === 0 ? (
              <EmptyProjectState
                Icon={Clock}
                title="No projects in planning"
                description="Start planning your first project with AI assistance"
                actionLabel="Create Project"
                onAction={handleCreateNew}
                colorClass="text-orange-400"
                bgColorClass="bg-orange-50"
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {planningProjects.map((project) => (
                  <ProjectCard
                    key={project.project_id}
                    project={project}
                    onClick={() => navigate(`/projects/${project.project_id}`)}
                    onContinue={(e) => {
                      e.stopPropagation();
                      handleContinuePlanning(project.project_id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
