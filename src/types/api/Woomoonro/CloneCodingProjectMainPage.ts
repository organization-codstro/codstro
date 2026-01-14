export interface GetAllProjectsWithUserStatusParams {
  userId: string;
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
