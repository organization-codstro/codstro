import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import ProjectGrid from "../../components/Woomoonro/CloneCodingProjectGrid/CloneCodingProjectGrid";
import PageHeader from "../../components/Woomoonkyung/StudyPlanEditPage/PageHeader";
import ProjectFilters from "../../components/Woomoonro/CloneCodingProjectMainPage/ProjectFilters";
import NoResults from "../../components/Woomoonro/CloneCodingProjectMainPage/NoResults";
import { LoginService } from "../../api/Auth/LoginPage";
import { MainProjectService } from "../../api/Woomoonro/CloneCodingProjectMainPage";
import { MainProjectItem } from "../../types/pages/Woomoonro/CloneCodingProjectMainPage/CloneCodingProjectMainPage";

export default function CloneCodingProjectMainPage() {
  const navigate = useNavigate();

  /**
   * 상태 관리 (States)
   */
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [projectList, setProjectList] = useState<MainProjectItem[]>([]);

  /**
   * 필터 상태
   */
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "bookmarked" | "in progress" | "completed"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * [데이터 로드 로직]
   * 전체 프로젝트와 유저의 상태를 병합하여 가져옵니다.
   */
  const fetchProjects = useCallback(async (currentUserId: string) => {
    try {
      setIsLoading(true);
      const data = await MainProjectService.getAllProjectsWithUserStatus({
        userId: currentUserId,
      });

      // API 응답 구조를 CloneCodingProject 및 UserCloneCodingProject 형식으로 정제
      const formattedData: MainProjectItem[] = data.map((item: any) => ({
        project: {
          id: item.clone_coding_id,
          title: item.clone_coding_title,
          description: item.clone_coding_description,
          tech_stack: item.clone_coding_tech_stack || [],
          difficulty: item.clone_coding_difficulty,
          estimated_hours: item.clone_coding_estimated_hours,
          thumbnail_url: item.clone_coding_thumbnail_url,
          github_url: item.clone_coding_github_url,
          demo_url: item.clone_coding_demo_url,
          tags: item.clone_coding_tags || [],
          created_at: item.clone_coding_created_at,
        },
        userProject: item.user_project
          ? {
              id: item.user_project.user_clone_codings_id,
              user_id: item.user_project.user_id,
              project_id: item.clone_coding_id,
              status:
                item.user_project.user_clone_codings_status === "completed"
                  ? "done"
                  : item.user_project.user_clone_codings_status,
              is_bookmarked: item.user_project.user_clone_codings_is_bookmarked,
              created_at: item.clone_coding_created_at, // 기본값
            }
          : undefined,
      }));

      setProjectList(formattedData);
    } catch (error) {
      console.error(error);
      toast.error("프로젝트 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * [인증 확인 및 초기 실행]
   */
  useEffect(() => {
    const init = async () => {
      const id = await LoginService.getCurrentUserId();
      if (id) {
        setUserId(id);
        fetchProjects(id);
      } else {
        setIsLoading(false);
        // 비로그인 상태 대응이 필요할 경우 처리
      }
    };
    init();
  }, [fetchProjects]);

  /**
   * [북마크 토글 로직]
   * DB 업데이트 후 로컬 상태를 즉시 갱신합니다.
   */
  const handleToggleBookmark = async (projectId: string) => {
    if (!userId) {
      toast.warn("로그인이 필요한 기능입니다.");
      return;
    }

    const target = projectList.find((p) => p.project.id === projectId);
    const isBookmarked = target?.userProject?.is_bookmarked ?? false;

    try {
      await MainProjectService.toggleBookmark({
        userId,
        projectId,
        isBookmarked,
      });

      setProjectList((prev) =>
        prev.map((item) => {
          if (item.project.id === projectId) {
            return {
              ...item,
              userProject: {
                ...(item.userProject || {
                  id: "",
                  user_id: userId,
                  project_id: projectId,
                  status: "waiting",
                  created_at: new Date().toISOString(),
                }),
                is_bookmarked: !isBookmarked,
              },
            };
          }
          return item;
        })
      );
      toast.success(
        !isBookmarked ? "북마크에 추가되었습니다." : "북마크가 해제되었습니다."
      );
    } catch (error) {
      toast.error("북마크 처리에 실패했습니다.");
    }
  };

  /**
   * [필터링 및 검색 로직 (Client-side)]
   * UX를 위해 클라이언트 측에서 실시간 필터링을 수행합니다.
   */
  const filteredProjects = projectList.filter((item) => {
    const { project, userProject } = item;

    // 1. 진행 상태 필터
    if (selectedFilter === "bookmarked" && !userProject?.is_bookmarked)
      return false;
    if (
      selectedFilter === "in progress" &&
      userProject?.status !== "in progress"
    )
      return false;
    if (selectedFilter === "completed" && userProject?.status !== "done")
      return false;

    // 2. 난이도 필터
    if (
      selectedDifficulty !== "all" &&
      project.difficulty !== selectedDifficulty
    )
      return false;

    // 3. 검색 필터
    if (
      searchQuery &&
      !project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  /**
   * [프로젝트 상태 추출 헬퍼]
   */
  const getUserProject = (projectId: string) =>
    projectList.find((p) => p.project.id === projectId)?.userProject;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-[#587CF0] animate-spin" />
        <p className="text-gray-500 font-medium">
          프로젝트를 불러오고 있습니다...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <PageHeader
          title="Woomoonro"
          description="Discover and manage clone coding projects to level up your skills."
        />

        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filters Section */}
            <ProjectFilters
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter as any}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty as any}
            />

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#587CF0] outline-none"
              />
            </div>
          </div>

          {/* Projects Content */}
          {filteredProjects.length > 0 ? (
            <ProjectGrid
              projects={filteredProjects.map((item) => item.project)}
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
