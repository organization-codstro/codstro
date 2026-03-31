export interface NoteEditorHeaderProps {
  isDirty: boolean;
  onSave: () => void;
  onBack?: () => void; // optional chaining 쓰고 있으므로 optional
}
