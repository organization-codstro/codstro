export interface GetAllProjectsWithUserStatusParams {
  userId: number;
}

export interface FilteredProjectsParams {
  selectedFilter: string;
  selectedDifficulty: string;
  searchQuery: string;
}

export interface GetFilteredProjectsParams {
  userId: number;
  params: FilteredProjectsParams;
}

export interface ToggleBookmarkParams {
  userId: number;
  projectId: number;
  isBookmarked: boolean;
}
