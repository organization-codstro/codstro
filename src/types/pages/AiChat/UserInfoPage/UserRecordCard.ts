export interface UserRecordCardProps {
  isEditing: boolean;
  content: string;
  onContentChange: (value: string) => void;
}