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
