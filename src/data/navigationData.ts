import { NavigationItem } from "../types/pages/Sidebar/sidebar";

export const navigationData: NavigationItem[] = [
  {
    id: "woomoonjeong",
    title: "Woomoonjeong",
    icon: "FolderOpen",
    route: "/woomoonjeong",
    children: [
      {
        id: "todo-management",
        title: "To-do Management",
        icon: "CheckSquare",
        route: "/woomoonjeong",
      },
      {
        id: "documents-management",
        title: "Documents Management",
        icon: "FolderOpen",
        route: "/woomoonjeong/documents",
      },
      {
        id: "recommended-documents",
        title: "Recommended Documents",
        icon: "Star",
        route: "/woomoonjeong/documents/recommended",
      },
    ],
  },
  {
    id: "woomoonro",
    title: "Woomoonro",
    icon: "Code2", // 클론 코딩
    route: "/woomoonro",
    children: [
      {
        id: "woomoonro-main",
        title: "Woomoonro",
        icon: "GitFork", // 코드 복제
        route: "/woomoonro",
      },
      {
        id: "clone-archive",
        title: "Archive",
        icon: "Archive", // 보관함
        route: "/woomoonro/archive",
      },
    ],
  },
  {
    id: "woomoonkyung",
    title: "Woomoonkyung",
    icon: "BookOpen",
    route: "/woomoonkyung",
    children: [
      {
        id: "my-study-plans",
        title: "My Study Plans",
        icon: "Lightbulb",
        route: "/woomoonkyung",
      },
      {
        id: "recommended-plans",
        title: "Recommended Study Plans",
        icon: "Star",
        route: "/woomoonkyung/recommended",
      },
      {
        id: "study-archive",
        title: "Archive",
        icon: "Archive",
        route: "/woomoonkyung/archive",
      },
    ],
  },
  {
    id: "mbit",
    title: "MBIT",
    icon: "Brain", // 성격/테스트
    route: "/mbit",
    children: [
      {
        id: "today-fortune",
        title: "Today's Dev Fortune",
        icon: "Sparkles", // 오늘의 운세
        route: "/mbit/fortune",
      },
      {
        id: "fortune-encyclopedia",
        title: "Dev Fortune Encyclopedia",
        icon: "ScrollText", // 운세 백과사전
        route: "/mbit/fortune-encyclopedia",
      },
      {
        id: "personality-test",
        title: "Dev Personality Test",
        icon: "UserCircle", // 성격 테스트
        route: "/mbit/personality",
      },
      {
        id: "personality-encyclopedia",
        title: "Personality Test Encyclopedia",
        icon: "BookText", // 성격 백과사전
        route: "/mbit/personality-encyclopedia",
      },
      {
        id: "major-test",
        title: "Recommended Major Test",
        icon: "GraduationCap", // 전공 테스트
        route: "/mbit/major",
      },
      {
        id: "major-encyclopedia",
        title: "Major Encyclopedia & Descriptions",
        icon: "BookMarked", // 전공 백과사전
        route: "/mbit/major-encyclopedia",
      },
    ],
  },
  {
    id: "project-planning",
    title: "Project Planning",
    icon: "Briefcase", // 프로젝트 기획
    route: "/projects",
    children: [
      {
        id: "projects",
        title: "Projects",
        icon: "FolderKanban", // 프로젝트 관리
        route: "/projects",
      },
      {
        id: "project-archive",
        title: "Archive",
        icon: "Archive", // 보관함
        route: "/projects/archive",
      },
    ],
  },
  {
    id: "coding-concepts",
    title: "Coding Concepts",
    icon: "Terminal",
    route: "/concepts", // 변경
    children: [
      {
        id: "concept-main",
        title: "Home",
        icon: "Home",
        route: "/concepts", // 변경
      },
      {
        id: "libraries-list",
        title: "Libraries & Frameworks",
        icon: "Package",
        route: "/libraries", // 변경
      },
      {
        id: "basic-concepts-list",
        title: "Basic Concepts",
        icon: "GraduationCap",
        route: "/basic-concepts", // 변경
      },
      {
        id: "coding-tools-list",
        title: "Coding Tools",
        icon: "Wrench",
        route: "/coding-tools", // 변경
      },
      {
        id: "third-party-list",
        title: "Third-party Services",
        icon: "CloudCog",
        route: "/third-partys", // 변경
      },
      {
        id: "package-manager-list",
        title: "Package Managers",
        icon: "CloudCog",
        route: "/package-managers", // 변경
      },
      {
        id: "notes-list",
        title: "My Notes",
        icon: "StickyNote",
        route: "/notes", // 변경
      },
    ],
  },
  {
    id: "ai-chat",
    title: "AI Chat Service",
    icon: "MessageCircle", // AI 채팅
    route: "/ai-chat",
  },
  {
    id: "company-info",
    title: "Company Info Sharing",
    icon: "Building2", // 회사 정보
    route: "/companies",
    children: [
      {
        id: "company-list",
        title: "Company List",
        icon: "Building", // 회사 목록
        route: "/companies",
      },
      {
        id: "bookmarks",
        title: "Bookmarks",
        icon: "Bookmark", // 북마크
        route: "/bookmarks",
      },
      {
        id: "interview-history",
        title: "Interview History",
        icon: "Clock", // 면접 기록
        route: "/interviews",
      },
      {
        id: "matching-history",
        title: "Matching History",
        icon: "ListChecks", // 매칭 히스토리
        route: "/matches",
      },
    ],
  },
];
