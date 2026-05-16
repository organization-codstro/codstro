export interface DashboardHeaderProps {
  title: string;
  description: string;
  onArchiveClick: () => void;
  onCreateClick: () => void;
  onCreateAiClick: () => void; // AI 생성 버튼 핸들러
}
