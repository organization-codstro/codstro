import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ProjectDetailHeader } from "../../components/Woomoonro/CloneCodingProjectDetailPage/CloneCodingProjectDetailHeader";
import { ProjectInfoGrid } from "../../components/Woomoonro/CloneCodingProjectDetailPage/CloneCodingProjectInfoGrid";
import { ProjectStatusCard } from "../../components/Woomoonro/CloneCodingProjectDetailPage/CloneCodingProjectStatusCard";
import { LoginService } from "../../api/Auth/LoginPage";
import { CloneCodingService } from "../../api/Woomoonro/CloneCodingProjectDetailPage";
import {
  CLONE_CODING_STATE_TYPE,
  STATUS_COLORS,
} from "../../constants/Woomoonro/Woomoonro";
import { UserProjectStatus } from "../../types/pages/Woomoonro/CloneCodingProjectDetailPage/CloneCodingProjectDetailPage";
import { CloneCodingProject } from "../../types/common/Woomoonro";
import { NotFoundPage } from "../NotFound/NotFoundPage";

export default function CloneCodingProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  /**
   * 상태 관리 (States)
   */
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [project, setProject] = useState<CloneCodingProject | null>(null);
  const [userProject, setUserProject] = useState<UserProjectStatus | undefined>(
    undefined,
  );

  /**
   * [데이터 로드 로직]
   */
  const loadProjectData = useCallback(
    async (uid: string, pid: string) => {
      try {
        if (!projectId) {
          return;
        }
        setIsLoading(true);
        const [projectDetail, userStatus] = await Promise.all([
          CloneCodingService.getProjectDetail({ projectId: pid }),
          CloneCodingService.getUserProjectStatus({
            userId: uid,
            projectId: pid,
          }),
        ]);

        if (!projectDetail) {
          toast.error("프로젝트 정보를 찾을 수 없습니다.");
          return;
        }

        // DB 컬럼명 매핑 및 상태 저장
        setProject({
          id: projectDetail.id,
          title: projectDetail.title,
          description: projectDetail.description,
          difficulty: projectDetail.difficulty,
          tech_stack: projectDetail.tech_stack,
          estimated_hours: projectDetail.estimated_hours,
          thumbnail_url: projectDetail.thumbnail_url,
          github_url: projectDetail.github_url,
          demo_url: projectDetail.demo_url,
          tags: projectDetail.tags,
          clone_coding_steps: projectDetail.clone_coding_steps,
          clone_coding_project_structure:
            projectDetail.clone_coding_project_structure,
        });

        if (userStatus) {
          setUserProject({
            status: userStatus.user_clone_coding_status,
            is_bookmarked: userStatus.user_clone_coding_is_bookmarked,
          });
        } else {
          // 데이터가 없을 경우 기본값
          setUserProject({ status: "waiting", is_bookmarked: false });
        }
      } catch (error) {
        console.error(error);
        toast.error("데이터 로딩 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  /**
   * [초기화 세션 확인]
   */
  useEffect(() => {
    const init = async () => {
      if (!projectId) {
        navigate("/woomoonro");
        return;
      }
      const id = await LoginService.getCurrentUserId();
      if (id) {
        setUserId(id);
        loadProjectData(id, projectId);
      } else {
        toast.error("로그인이 필요합니다.");
        navigate("/login");
      }
    };
    init();
  }, [projectId, navigate, loadProjectData]);

  /**
   * [북마크 토글 로직]
   */
  const onToggleBookmark = async () => {
    if (!userId || !projectId || !userProject) return;

    try {
      await CloneCodingService.toggleBookmark({
        userId,
        projectId,
        currentStatus: userProject.is_bookmarked,
      });

      setUserProject((prev) =>
        prev ? { ...prev, is_bookmarked: !prev.is_bookmarked } : prev,
      );
      toast.success(userProject.is_bookmarked ? "북마크 해제" : "북마크 추가");
    } catch (error) {
      toast.error("북마크 업데이트 실패");
    }
  };

  /**
   * [상태 업데이트 로직]
   */
  const onUpdateStatus = async (status: CLONE_CODING_STATE_TYPE) => {
    if (!userId || !projectId) return;

    try {
      await CloneCodingService.updateProjectStatus({
        userId,
        projectId,
        status: status,
      });

      setUserProject((prev) => (prev ? { ...prev, status } : prev));
      toast.success(`상태가 ${status}(으)로 변경되었습니다.`);
    } catch (error) {
      toast.error("상태 업데이트 실패");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500">프로젝트 정보를 가져오는 중...</p>
      </div>
    );
  }

  if (!project) return <NotFoundPage />;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/woomoonro")}
            className="p-2 transition-colors rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
          <ProjectDetailHeader
            title={project.title}
            description={project.description}
            isBookmarked={userProject?.is_bookmarked}
            onToggleBookmark={onToggleBookmark}
            thumbnailUrl={project.thumbnail_url}
          />

          <div className="p-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <ProjectInfoGrid
                status={userProject?.status}
                statusColor={
                  userProject?.status ? STATUS_COLORS[userProject.status] : ""
                }
                estimatedHours={project.estimated_hours}
                techStack={project.tech_stack}
                tags={project.tags}
                githubUrl={project.github_url}
                demoUrl={project.demo_url}
              />

              <ProjectStatusCard
                currentStatus={userProject?.status || "waiting"}
                onStatusChange={onUpdateStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
