export interface EditableFieldProps {
  isEditing: boolean;
  value: string;
  onChange: (val: string) => void;
  label: string;
  type?: "input" | "textarea";
  rows?: number;
  isMono?: boolean;
}
