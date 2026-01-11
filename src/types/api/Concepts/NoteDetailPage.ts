export interface NoteDetailResponse {
  id: number;
  title: string;
  content: string;
  labels: string[]; // 스키마의 note_labels
  lastUpdated: string; // created_date 또는 별도 수정일
  userId: number;
  // 관계 데이터
  relatedConcepts?: any[];
}
