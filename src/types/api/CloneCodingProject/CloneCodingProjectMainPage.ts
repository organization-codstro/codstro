import { CloneCodingSteps } from "../../common/CloneCodingProject";

/**
 * getAllProjectsWithUserStatus 함수 파라미터 및 반환 타입 정의
 */
export interface GetAllProjectsWithUserStatusParams {
  userId: string;
}
/**
 * getAllProjectsWithUserStatus 함수 반환 데이터 구조 정의
 */
interface UserCloneCoding {
  user_clone_coding_id: string;
  user_clone_coding_status: string;
  user_clone_coding_is_bookmarked: boolean;
  user_id: string;
}

/**
 * getAllProjectsWithUserStatus 함수 반환 데이터 구조 정의 (클론코딩 프로젝트 + 유저 상태)
 */
export interface CloneCodingWithUserStatus {
  clone_coding_id: string;
  clone_coding_title: string;
  clone_coding_description: string;
  clone_coding_tech_stack?: string[];
  clone_coding_difficulty: string;
  clone_coding_estimated_hours: string;
  clone_coding_thumbnail_url: string;
  clone_coding_github_url: string;
  clone_coding_demo_url: string;
  clone_coding_tags?: string[];
  clone_coding_steps: CloneCodingSteps[] | string;
  clone_coding_project_structure: string;
  clone_coding_created_at: string;
  user_status: UserCloneCoding[];
}

export interface FilteredProjectsParams {
  selectedFilter: string;
  selectedDifficulty: string;
  searchQuery: string;
}

export interface GetFilteredProjectsParams {
  userId: string;
  params: FilteredProjectsParams;
}

export interface ToggleBookmarkParams {
  userId: string;
  projectId: string;
  isBookmarked: boolean;
}

export interface GenerateCloneCodingParams {
  userId: string;
  name: string;
  topic: string;
  features: string;
  level: 1 | 2 | 3 | 4 | 5;
  gitUrl?: string;
  frameworks?: string[];
  libraries?: string[];
}
