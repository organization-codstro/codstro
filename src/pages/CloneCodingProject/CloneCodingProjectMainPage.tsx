import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Plus } from "lucide-react";
import { ProjectGrid } from "../../components/CloneCodingProject/CloneCodingProjectGrid/CloneCodingProjectGrid";
import { PageHeader } from "../../components/Woomoonkyung/StudyPlanEditPage/PageHeader";
import { ProjectFilters } from "../../components/CloneCodingProject/CloneCodingProjectMainPage/ProjectFilters";
import { NoResults } from "../../components/CloneCodingProject/CloneCodingProjectMainPage/NoResults";
import { LoginService } from "../../api/Auth/LoginPage";
import { MainProjectItem } from "../../types/pages/CloneCodingProject/CloneCodingProjectMainPage/CloneCodingProjectMainPage";
import { AddCloneCodingModal } from "../../components/CloneCodingProject/CloneCodingProjectMainPage/Addclonecodingmodal";
import { CloneCodingProjectMainPageService } from "../../api/CloneCodingProject/CloneCodingProjectMainPage";

export default function CloneCodingProjectMainPage() {
  const navigate = useNavigate();

  /**
   * 상태 관리 (States)
   */
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [projectList, setProjectList] = useState<MainProjectItem[]>([]);

  /**
   * 모달 상태
   */
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  /**
   * 필터 상태
   */
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "waiting" | "in progress" | "done"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * [데이터 로드 로직]
   * 전체 프로젝트와 유저의 상태를 병합하여 가져옵니다.
   */
  const fetchProjects = useCallback(async (currentUserId: string) => {
    try {
      setIsLoading(true);
      const data =
        await CloneCodingProjectMainPageService.getAllProjectsWithUserStatus({
          userId: currentUserId,
        });

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
          clone_coding_steps: item.clone_coding_steps,
          clone_coding_project_structure: item.clone_coding_project_structure,
          created_at: item.clone_coding_created_at,
        },
        userProject: item.user_project
          ? {
              id: item.user_project.user_clone_codings_id,
              user_id: item.user_project.user_id,
              project_id: item.clone_coding_id,
              status: item.user_project.user_clone_coding_status,
              is_bookmarked: item.user_project.user_clone_coding_is_bookmarked,
              created_at: item.clone_coding_created_at,
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
      }
    };
    init();
  }, [fetchProjects]);

  /**
   * [북마크 토글 로직]
   */
  const handleToggleBookmark = async (projectId: string) => {
    if (!userId) {
      toast.warn("로그인이 필요한 기능입니다.");
      return;
    }

    const target = projectList.find((p) => p.project.id === projectId);
    const isBookmarked = target?.userProject?.is_bookmarked ?? false;

    try {
      await CloneCodingProjectMainPageService.toggleBookmark({
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
        }),
      );
      toast.success(
        !isBookmarked ? "북마크에 추가되었습니다." : "북마크가 해제되었습니다.",
      );
    } catch (error) {
      toast.error("북마크 처리에 실패했습니다.");
    }
  };

  /**
   * [필터링 및 검색 로직 (Client-side)]
   */
  const filteredProjects = projectList.filter((item) => {
    const { project, userProject } = item;

    if (selectedFilter === "all") {
      // all을 선택했을 때는 모든 프로젝트 보여
    } else if (
      selectedFilter === "waiting" &&
      userProject?.status !== "waiting"
    )
      return false;
    else if (
      selectedFilter === "in progress" &&
      userProject?.status !== "in progress"
    )
      return false;
    else if (selectedFilter === "done" && userProject?.status !== "done")
      return false;

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
        <p className="font-medium text-gray-500">
          프로젝트를 불러오고 있습니다...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header + Add 버튼 */}
        <div className="flex items-start justify-between">
          <PageHeader
            title="Clone Coding Projects"
            description="Discover and manage clone coding projects to level up your skills."
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filters Section */}
            <ProjectFilters
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <div className="flex gap-4">
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

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#587CF0] text-white text-sm font-medium rounded-xl hover:bg-[#4A6EE0] transition-colors shrink-0 ml-auto"
              >
                <Plus size={16} />
                Add Clone Coding
              </button>
            </div>
          </div>

          {/* Projects Content */}
          {filteredProjects.length > 0 ? (
            <ProjectGrid
              projects={filteredProjects.map((item) => item.project)}
              getUserProject={getUserProject}
              onCardClick={(id) => navigate(`/clone-coding-project/project/${id}`)}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : (
            <NoResults />
          )}
        </div>
      </div>

      {/* Add Clone Coding 모달 */}
      <AddCloneCodingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          if (userId) fetchProjects(userId);
        }}
        userId={userId}
      />
    </div>
  );
}
