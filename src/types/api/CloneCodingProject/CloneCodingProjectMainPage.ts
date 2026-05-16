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
