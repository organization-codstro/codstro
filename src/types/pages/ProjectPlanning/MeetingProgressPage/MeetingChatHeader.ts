export interface MeetingChatHeaderProps {
  meetingId: string | undefined;
  onBack: () => void;
  onViewMaterials: () => void;
  onSave: () => void;
  onEnd: () => void;
}