import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  Search,
  CheckCircle2,
  PlayCircle,
  Circle,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { LoginService } from "../../api/Auth/LoginPage";
import { ArchiveService } from "../../api/Woomoonro/CloneCodingProjectArchivePage";
import ProjectGrid from "../../components/Woomoonro/CloneCodingProjectGrid/CloneCodingProjectGrid";
import { StatCard } from "../../components/Woomoonro/CloneCodingProjectArchivePage/CloneCodingProjectStatCard";
import ArchiveFilters from "../../components/Woomoonro/CloneCodingProjectArchivePage/CloneCodingProjectArchiveFilters";

import {
  ArchivedProjectItem,
  ArchiveStats,
} from "../../types/pages/Woomoonro/CloneCodingProjectArchivePage/CloneCodingProjectArchivePage";

export default function CloneCodingProjectArchivePage() {
  const navigate = useNavigate();

  /**
   * 상태 관리 (States)
   */
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [archivedData, setArchivedData] = useState<ArchivedProjectItem[]>([]);
  const [stats, setStats] = useState<ArchiveStats>({
    total: 0,
    waiting: 0,
    "in progress": 0,
    done: 0,
  });

  /**
   * 필터 및 검색 상태
   */
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  /**
   * [데이터 로드 로직]
   * 유저 ID 확보 후 통계 및 프로젝트 리스트를 병렬로 가져옵니다.
   */
  const fetchData = useCallback(async (currentUserId: string) => {
    try {
      setIsLoading(true);
      const [projects, archiveStats] = await Promise.all([
        ArchiveService.getBookmarkedProjects({ userId: currentUserId }),
        ArchiveService.getArchiveStats({ userId: currentUserId }),
      ]);

      setArchivedData(projects as unknown as ArchivedProjectItem[]);
      setStats(archiveStats);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      toast.error("데이터 로드 실패");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * [초기 인증 확인 및 데이터 호출]
   */
  useEffect(() => {
    const init = async () => {
      const id = await LoginService.getCurrentUserId();
      if (id) {
        setUserId(id);
        fetchData(id);
      } else {
        toast.error("로그인이 필요합니다.");
        setIsLoading(false);
      }
    };
    init();
  }, [fetchData]);

  /**
   * [북마크 해제 로직]
   * Pending UI(2단계 확정) 대신 즉시 반영 후 토스트 알림을 제공하거나,
   * 서비스 규칙에 따라 removeBookmark 호출 후 상태를 갱신합니다.
   */
  const handleToggleBookmark = async (projectId: string) => {
    if (!userId) return;

    try {
      // 2단계 확정 로직 대용: 토스트 로딩 활용
      const loadingToast = toast.loading("북마크를 해제하는 중...");

      await ArchiveService.removeBookmark({ userId, projectId });

      // 로컬 상태 업데이트 (삭제된 항목 제외)
      setArchivedData((prev) =>
        prev.filter((item) => item.userProject.project_id !== projectId),
      );

      // 통계 재계산 (필요 시 fetchData 재호출 가능)
      setStats((prev) => ({ ...prev, total: prev.total - 1 }));

      toast.update(loadingToast, {
        render: "북마크가 해제되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
    } catch (err) {
      toast.error("북마크 해제 실패");
    }
  };

  /**
   * [필터링 및 정렬 로직]
   */
  const filteredProjects = archivedData
    .filter((item) => {
      const { project, userProject } = item;

      if (selectedFilter !== "all" && userProject.status !== selectedFilter)
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
      if (sortBy === "title")
        return a.project.title.localeCompare(b.project.title);
      if (sortBy === "date") {
        const dateA = new Date(a.project.created_at ?? 0).getTime();
        const dateB = new Date(b.project.created_at ?? 0).getTime();
        return dateB - dateA;
      }

      return 0;
    });

  /**
   * [유저 프로젝트 정보 추출 헬퍼]
   */
  const getUserProject = (projectId: string) =>
    archivedData.find((item) => item.userProject.project_id === projectId)
      ?.userProject;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-[#587CF0] animate-spin" />
        <p className="font-medium text-gray-500">
          아카이브를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
            value={stats.total}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
            label="done"
            value={stats.done}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<PlayCircle className="w-5 h-5 text-yellow-600" />}
            label="in Progress"
            value={stats["in progress"]}
            bgColor="bg-yellow-50"
          />
          <StatCard
            icon={<Circle className="w-5 h-5 text-gray-600" />}
            label="waiting"
            value={stats.waiting}
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
        {filteredProjects.length > 0 ? (
          <ProjectGrid
            projects={filteredProjects.map((item) => item.project)}
            getUserProject={getUserProject}
            onCardClick={(id) => navigate(`/woomoonro/project/${id}`)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 border-dashed shadow-sm rounded-3xl">
            <Archive className="w-12 h-12 mb-4 text-gray-300" />
            <p className="font-medium text-gray-500">
              아카이브된 프로젝트가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
