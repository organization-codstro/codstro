export interface NoteDetailPropos {
  id?: number;
  title: string;
  content: string;
  labels: string[]; // concepts 목록을 labels로 활용
  userId: number;
}

export interface AvailableConcept {
  id: string;
  name: string;
  type: string;
}
