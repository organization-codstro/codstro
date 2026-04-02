export interface NoteSummaryResponse {
  id: string;
  title: string;
  concepts: string[]; // 스키마의 note_labels
  lastUpdated?: string; // created_date
  description: string; // note_description 또는 content 요약
}

/**
 * [GetUserNotesParams]
 * 유저 노트 목록 조회 파라미터
 */
export interface GetUserNotesParams {
  userId: string;
}

/**
 * [SearchUserNotesParams]
 * 유저 노트 검색 파라미터
 */
export interface SearchUserNotesParams {
  userId: string;
  keyword: string;
}
