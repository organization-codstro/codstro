export interface MaterialsHeaderProps {
  meetingId: string | undefined;
  isEditing: boolean;
  onBack: () => void;
  onEdit: () => void;
  onSave: () => void;
}
