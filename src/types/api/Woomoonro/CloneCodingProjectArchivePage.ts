export interface CloneCodingsResponse {
  clone_coding_id: string; // PK / number
  clone_coding_title: string; // text
  clone_coding_description: string; // text
  clone_coding_tech_stack: string; // text[]
  clone_codings_tags: string; // text[]
  clone_codings_difficulty: string; // text
  clone_codings_estimated_hours: string; // text
  clone_codings_thumbnail_url: string; // text
  clone_codings_github_url: string | null; // text
  clone_codings_demo_url: string | null; // text
  clone_codings_steps: any; // json
  clone_codings_project_structure: string | null; // text
  clone_codings_created_at: Date; // date
}

export interface GetBookmarkedProjectsParams {
  userId: string;
}

export interface GetArchiveStatsParams {
  userId: string;
}

export interface ArchiveFilterParams {
  status?: string;
  difficulty?: string;
  searchQuery?: string;
}

export interface GetFilteredArchiveParams {
  userId: string;
  filters: ArchiveFilterParams;
}

export interface RemoveBookmarkParams {
  userId: string;
  projectId: string;
}
