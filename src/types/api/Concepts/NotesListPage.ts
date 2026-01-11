export interface NoteSummaryResponse {
  id: number;
  title: string;
  concepts: string[]; // 스키마의 note_labels
  lastUpdated: string; // created_date
  preview: string; // note_description 또는 content 요약
}
