/**
 * [프로젝트 상세 정보 타입]
 */
export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tech_stack: string[];
  estimated_hours: string;
  thumbnail_url?: string;
  github_url?: string;
  demo_url?: string;
  tags: string[];
}

/**
 * [유저 프로젝트 진행 상태 타입]
 */
export interface UserProjectStatus {
  status: "waiting" | "in progress" | "done";
  is_bookmarked: boolean;
}
